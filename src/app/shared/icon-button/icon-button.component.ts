import { Component, input } from '@angular/core';

@Component({
  selector: 'button.icon',
  imports: [],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.css',
})
export class IconButtonComponent {
  text = input<string>();
}
