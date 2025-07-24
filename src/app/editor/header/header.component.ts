import { Component, inject } from '@angular/core';

import { EditorService } from '../editor.service';
import { IconButtonComponent } from '../../shared/icon-button/icon-button.component';
import { FileImporterComponent } from '../file-importer/file-importer.component';

@Component({
  selector: 'header',
  imports: [IconButtonComponent, FileImporterComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  editorService = inject(EditorService);

  onRunClick() {
    this.editorService.isRequestPerformed = true;
    this.editorService.submitCode();
  }

  async onCopyClick() {
    await this.editorService.copyCode();
  }

  onExportClick() {
    this.editorService.exportCode();
  }
}
