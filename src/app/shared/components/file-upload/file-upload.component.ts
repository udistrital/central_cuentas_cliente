import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ngx-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  @Output() prepareFilesList = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onFileDropped($event: any[]) {
    this.prepareFilesList.emit($event);
  }

  fileBrowseHandler(files: any[]) {
    this.prepareFilesList.emit(files);
  }

}
