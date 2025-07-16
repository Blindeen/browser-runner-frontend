import { Component, ElementRef, afterNextRender, inject } from '@angular/core';

import { basicSetup } from 'codemirror';
import { EditorView, keymap, ViewUpdate } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorState } from '@codemirror/state';

import { EditorService } from '../../services/editor.service';

@Component({
  selector: 'app-code-editor',
  imports: [],
  templateUrl: './code-editor.component.html',
  styleUrl: './code-editor.component.css',
})
export class CodeEditorComponent {
  private view?: EditorView;
  private editorService = inject(EditorService);

  constructor(el: ElementRef) {
    afterNextRender(() => {
      const onChangeListener = EditorView.updateListener.of(
        (update: ViewUpdate) => {
          if (update.docChanged) {
            this.editorService.updateCode(update.state.doc.toString());
          }
        }
      );

      const state = EditorState.create({
        doc: '',
        extensions: [
          keymap.of(defaultKeymap),
          basicSetup,
          oneDark,
          javascript({ typescript: true }),
          onChangeListener,
        ],
      });

      this.view = new EditorView({
        state: state,
        parent: el.nativeElement,
      });
    });
  }
}
