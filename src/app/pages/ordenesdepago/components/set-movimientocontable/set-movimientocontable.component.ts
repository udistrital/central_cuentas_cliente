import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {
  CONFIGURACION_MOVIMIENTO_CONTABLE, DATOS_MOVIMIENTO_CONTABLE
 } from '../../interfaces/interfaces';

@Component({
  selector: 'ngx-set-movimientocontable',
  templateUrl: './set-movimientocontable.component.html',
  styleUrls: ['./set-movimientocontable.component.scss']
})
export class SetMovimientocontableComponent implements OnInit {
  movimientoContable: FormGroup;
  configTableMovimientoContable: any;
  datosTableMovimientoContable: any;

  constructor(private fb: FormBuilder) {
    this.configTableMovimientoContable = CONFIGURACION_MOVIMIENTO_CONTABLE;
    this.datosTableMovimientoContable = DATOS_MOVIMIENTO_CONTABLE;
  }

  ngOnInit() {
    this.movimientoContable = this.fb.group({
      firstCtrl: ['', Validators.required]
    });
  }
}
