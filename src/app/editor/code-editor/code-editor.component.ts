import { AfterViewInit, Component, ElementRef, inject } from '@angular/core';

import { basicSetup } from 'codemirror';
import { EditorView, keymap, ViewUpdate } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorState } from '@codemirror/state';

import { EditorService } from '../editor.service';

@Component({
  selector: 'app-code-editor',
  imports: [],
  templateUrl: './code-editor.component.html',
  styleUrl: './code-editor.component.css',
})
export class CodeEditorComponent implements AfterViewInit {
  private editorService = inject(EditorService);

  constructor(private hostElement: ElementRef) {}

  ngAfterViewInit() {
    const onChangeListener = EditorView.updateListener.of(
      (update: ViewUpdate) => {
        if (update.docChanged) {
          this.editorService.code = update.state.doc.toString();
        }
      }
    );

    const state = EditorState.create({
      doc: this.editorService.code,
      extensions: [
        keymap.of(defaultKeymap),
        basicSetup,
        oneDark,
        javascript(),
        onChangeListener,
      ],
    });

    const view = new EditorView({
      state: state,
      parent: this.hostElement.nativeElement,
    });

    view.focus();
  }
}
