import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-set-pdfview',
  templateUrl: './set-pdfview.component.html',
  styleUrls: ['./set-pdfview.component.scss']
})
export class SetPdfviewComponent implements OnInit {

  // @Input('enlacePDF') enlacePDF: string;
  // @Input('tituloPDF') tituloPDF: string;
  // @Output() goBack = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
 
  // cambioTab () {
  //   this.goBack.emit(false);
  // }
}
