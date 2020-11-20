import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

export interface PeriodicElement {
  nameDocs: string;
  stateDocs: string;
  changeDocs: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
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

  displayedColumns: string[] = ['nameDocs', 'stateDocs', 'changeDocs'];
  dataSource = ELEMENT_DATA;

  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {

   }

  ngOnInit() {
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

}
