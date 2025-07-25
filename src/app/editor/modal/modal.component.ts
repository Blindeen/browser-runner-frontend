import { Component, ElementRef, inject, effect } from '@angular/core';

import { IconButtonComponent } from '../../shared/icon-button/icon-button.component';
import { EditorService } from '../service/editor.service';

@Component({
  selector: 'dialog',
  imports: [IconButtonComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  host: {
    '(close)': 'closeModal()',
  },
})
export class ModalComponent {
  editorService = inject(EditorService);
  private hostEl = inject<ElementRef<HTMLDialogElement>>(
    ElementRef<HTMLDialogElement>
  );

  constructor() {
    effect(() => {
      const dialogEl = this.hostEl.nativeElement;
      if (this.editorService.submissionOutput() !== undefined) {
        dialogEl.showModal();
      } else {
        dialogEl.close();
      }
    });
  }

  closeModal() {
    this.editorService.submissionOutput.set(undefined);
  }
}
