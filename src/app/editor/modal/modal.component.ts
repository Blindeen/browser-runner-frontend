import { Component, ElementRef, inject, effect } from '@angular/core';

import { IconButtonComponent } from '../../shared/icon-button/icon-button.component';
import { ApiService } from '../services/api.service';

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
  apiService = inject(ApiService);
  private hostEl = inject<ElementRef<HTMLDialogElement>>(
    ElementRef<HTMLDialogElement>
  );

  constructor() {
    effect(() => {
      const dialogEl = this.hostEl.nativeElement;
      if (this.apiService.submissionOutput() !== undefined) {
        dialogEl.showModal();
      } else {
        dialogEl.close();
      }
    });
  }

  closeModal() {
    this.apiService.submissionOutput.set(undefined);
  }
}
