import { Component, ElementRef, afterNextRender } from '@angular/core';

import { basicSetup } from 'codemirror';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';

@Component({
  selector: 'app-code-editor',
  imports: [],
  templateUrl: './code-editor.component.html',
  styleUrl: './code-editor.component.css',
})
export class CodeEditorComponent {
  constructor(private el: ElementRef) {
    afterNextRender(() => {
      let view = new EditorView({
        doc: '',
        parent: el.nativeElement,
        extensions: [keymap.of(defaultKeymap), basicSetup],
      });
    });
  }
}
