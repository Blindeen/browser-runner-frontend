import { AfterViewInit, Component, ElementRef, inject } from '@angular/core';
import { environment as env } from '../../../environments/environment';

import { basicSetup } from 'codemirror';
import { EditorView, keymap, ViewUpdate } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorState } from '@codemirror/state';

import { EditorService } from '../service/editor.service';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrl: './code-editor.component.css',
})
export class CodeEditorComponent implements AfterViewInit {
  private editorService = inject(EditorService);
  private hostEl = inject(ElementRef);

  ngAfterViewInit() {
    const onChangeListener = EditorView.updateListener.of(
      (update: ViewUpdate) => {
        if (update.docChanged) {
          const code = update.state.doc.toString();
          localStorage.setItem(env.codeKey, code);
        }
      }
    );

    const state = EditorState.create({
      doc: localStorage.getItem(env.codeKey) ?? env.codeFallback,
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
      parent: this.hostEl.nativeElement,
    });
    this.editorService.setView(view);
    view.focus();
  }
}
