import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface UploadData {
  nameDocs: string;
  stateDocs: string;
  changeDocs: string;
}

const ELEMENT_DATA: UploadData[] = [
  {
    nameDocs: 'documento1',
    stateDocs: 'Listo',
    changeDocs: 'Borrar'
  },
  {
    nameDocs: 'documento2',
    stateDocs: 'CARGAR',
    changeDocs: 'Borrar'
  },
  {
    nameDocs: 'documento3',
    stateDocs: 'CARGAR',
    changeDocs: 'Borrar'  },
];

@Component({
  selector: 'ngx-set-cargardocumentos',
  templateUrl: './set-cargardocumentos.component.html',
  styleUrls: ['./set-cargardocumentos.component.scss']
})
export class SetCargardocumentosComponent implements OnInit {

  documentosGroup: FormGroup;

  displayedColumns: string[] = ['nameDocs', 'stateDocs', 'changeDocs'];
  dataSource = ELEMENT_DATA;

  constructor(private _formBuilder: FormBuilder, config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
   }

   open(content) {
    this.modalService.open(content);
  }

  ngOnInit() {
    this.documentosGroup = this._formBuilder.group({
      documentos: new FormControl('', [Validators.required]),
    });
  }
}
