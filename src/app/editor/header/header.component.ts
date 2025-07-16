import { Component } from '@angular/core';

import { IconButtonComponent } from '../../shared/icon-button/icon-button.component';

@Component({
  selector: 'header',
  imports: [IconButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  onRunClick() {
    console.log('Run!');
  }
}
