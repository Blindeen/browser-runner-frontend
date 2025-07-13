import { Component, ElementRef, afterNextRender } from '@angular/core';

import { basicSetup } from 'codemirror';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorState } from '@codemirror/state';

@Component({
  selector: 'app-code-editor',
  imports: [],
  templateUrl: './code-editor.component.html',
  styleUrl: './code-editor.component.css',
})
export class CodeEditorComponent {
  private view?: EditorView;

  constructor(el: ElementRef) {
    afterNextRender(() => {
      const state = EditorState.create({
        doc: '',
        extensions: [
          keymap.of(defaultKeymap),
          basicSetup,
          oneDark,
          javascript({ typescript: true }),
        ],
      });

      this.view = new EditorView({
        state: state,
        parent: el.nativeElement,
      });
    });
  }
}
