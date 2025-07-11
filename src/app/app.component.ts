import { Component } from '@angular/core';
import { ToolbarComponent } from './toolbar/toolbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [ToolbarComponent],
})
export class AppComponent {
  title = 'browser-runner';
}
