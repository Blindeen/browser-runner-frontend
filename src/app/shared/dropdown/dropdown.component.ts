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

  show() {
    this.isVisible.set(true);
  }

  hide() {
    this.isVisible.set(false);
  }

  onDropdownContentClick(e: MouseEvent) {
    if (e.target !== e.currentTarget) {
      this.hide();
    }
  }

  @HostListener('document:click', ['$event'])
  private onFocusLoss(e: MouseEvent) {
    if (this.isVisible() && !this.hostEl.nativeElement.contains(e.target)) {
      this.hide();
    }
  }

  @HostListener('document:keyup.escape')
  private onEscPress() {
    if (this.isVisible()) {
      this.hide();
    }
  }
}
