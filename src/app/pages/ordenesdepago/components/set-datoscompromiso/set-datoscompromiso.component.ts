import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-set-datoscompromiso',
  templateUrl: './set-datoscompromiso.component.html',
  styleUrls: ['./set-datoscompromiso.component.scss']
})
export class SetDatoscompromisoComponent implements OnInit {
  datosCompromiso: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.datosCompromiso = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
  }
}
