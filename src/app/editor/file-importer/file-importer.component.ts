import { Component, ElementRef, viewChild, inject } from '@angular/core';

import { IconButtonComponent } from '../../shared/icon-button/icon-button.component';
import { EditorService } from '../editor.service';

@Component({
  selector: 'app-file-importer',
  imports: [IconButtonComponent],
  templateUrl: './file-importer.component.html',
  styleUrl: './file-importer.component.css',
})
export class FileImporterComponent {
  private editorService = inject(EditorService);
  private fileInput = viewChild.required<ElementRef<HTMLInputElement>>('input');

  onButtonClick() {
    this.fileInput().nativeElement.click();
  }

  onFileUpload() {
    const fileList = this.fileInput().nativeElement.files;
    if (fileList?.length === 1) {
      const file = fileList[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.editorService.code = reader.result as string;
      };
      reader.readAsText(file);
    }
  }
}
