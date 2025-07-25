import { Component, input } from '@angular/core';

@Component({
  selector: 'button.button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  icon = input<string>();
}
