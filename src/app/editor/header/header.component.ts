import { Component, inject } from '@angular/core';

import { EditorService } from '../editor.service';
import { IconButtonComponent } from '../../shared/icon-button/icon-button.component';

@Component({
  selector: 'header',
  imports: [IconButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private editorService = inject(EditorService);

  onRunClick() {
    this.editorService.submitCode();
  }

  async onCopyClick() {
    await this.editorService.copyCode();
  }
}
