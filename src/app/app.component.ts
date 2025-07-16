import { Component } from '@angular/core';

import { ToolbarComponent } from './editor/toolbar/toolbar.component';
import { FooterComponent } from './editor/footer/footer.component';
import { CodeEditorComponent } from './editor/code-editor/code-editor.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [ToolbarComponent, FooterComponent, CodeEditorComponent],
})
export class AppComponent {}
