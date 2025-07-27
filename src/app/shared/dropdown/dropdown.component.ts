import { Component, signal } from '@angular/core';

import { IconButtonComponent } from '../icon-button/icon-button.component';

@Component({
  selector: 'app-dropdown',
  imports: [IconButtonComponent],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
})
export class DropdownComponent {
  isVisible = signal(false);

  toggle() {
    this.isVisible.update((value) => !value);
  }
}
