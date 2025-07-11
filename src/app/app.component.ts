import { Component } from '@angular/core';

import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [ToolbarComponent, FooterComponent],
})
export class AppComponent {}
