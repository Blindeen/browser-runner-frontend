import { Component } from '@angular/core';

import { IconButtonComponent } from '../../shared/icon-button/icon-button.component';

@Component({
  selector: 'app-toolbar',
  imports: [IconButtonComponent],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent {
  onRunClick() {
    console.log('Run!');
  }
}
