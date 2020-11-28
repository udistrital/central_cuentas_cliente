import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-set-datosbeneficiario',
  templateUrl: './set-datosbeneficiario.component.html',
  styleUrls: ['./set-datosbeneficiario.component.scss']
})
export class SetDatosbeneficiarioComponent implements OnInit {
  datosBeneficiario: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.datosBeneficiario = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
  }

}
