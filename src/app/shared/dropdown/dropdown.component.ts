import {
  Component,
  ElementRef,
  HostListener,
  inject,
  signal,
} from '@angular/core';

import { IconButtonComponent } from '../icon-button/icon-button.component';

@Component({
  selector: 'app-dropdown',
  imports: [IconButtonComponent],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
})
export class DropdownComponent {
  private hostEl = inject<ElementRef>(ElementRef);
  isVisible = signal(false);

  toggle() {
    this.isVisible.update((value) => !value);
  }

  @HostListener('document:click', ['$event'])
  private onFocusLoss(e: PointerEvent) {
    if (this.isVisible() && !this.hostEl.nativeElement.contains(e.target)) {
      this.toggle();
    }
  }

  @HostListener('document:keyup.escape')
  private onEscPress() {
    if (this.isVisible()) {
      this.toggle();
    }
  }
}
