import { Component, ElementRef } from '@angular/core';

import { IconButtonComponent } from '../../shared/icon-button/icon-button.component';

@Component({
  selector: 'dialog',
  imports: [IconButtonComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {}
