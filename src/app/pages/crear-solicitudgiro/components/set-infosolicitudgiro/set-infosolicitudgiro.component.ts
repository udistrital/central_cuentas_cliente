import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';


@Component({
  selector: 'ngx-set-infosolicitudgiro',
  templateUrl: './set-infosolicitudgiro.component.html',
  styleUrls: ['./set-infosolicitudgiro.component.scss']
})
export class SetInfosolicitudgiroComponent implements OnInit {

  infoSolicitudGroup: FormGroup;

  constructor( private _formBuilder: FormBuilder ) {

  }

  ngOnInit() {
    this.infoSolicitudGroup = this._formBuilder.group({
      concepto: new FormControl('', [Validators.required]),
      areaFuncional: ['', Validators.required],
      tipoId: ['', Validators.required],
      numId: ['', Validators.required]
    });
  }

}
