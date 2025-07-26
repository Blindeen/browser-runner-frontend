import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  inject,
} from '@angular/core';
import { environment as env } from '../../../environments/environment';

import { basicSetup } from 'codemirror';
import { EditorView, keymap, ViewUpdate } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorState } from '@codemirror/state';

import { EditorService } from '../services/editor.service';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrl: './code-editor.component.css',
})
export class CodeEditorComponent implements AfterViewInit {
  private editorService = inject(EditorService);
  private hostEl = inject(ElementRef);
  private view!: EditorView;

  constructor() {
    effect(() => {
      const code = this.editorService.importedCode();
      if (code !== undefined) {
        this.setCode(code);
      }
    });
  }

  ngAfterViewInit() {
    const onChangeListener = EditorView.updateListener.of(
      (update: ViewUpdate) => {
        if (update.docChanged) {
          const code = update.state.doc.toString();
          this.editorService.code = code;
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

    this.view = new EditorView({
      state: state,
      parent: this.hostEl.nativeElement,
    });
    this.view.focus();
  }

  setCode(code: string) {
    const transaction = this.view.state.update({
      changes: {
        from: 0,
        to: this.view.state.doc.length,
        insert: code,
      },
    });
    this.view.dispatch(transaction);
    this.view.focus();
  }
}
