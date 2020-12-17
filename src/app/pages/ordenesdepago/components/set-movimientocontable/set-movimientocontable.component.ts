import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {
  CONFIGURACION_MOVIMIENTO_CONTABLE, DATOS_MOVIMIENTO_CONTABLE
 } from '../../interfaces/interfaces';
import { ConceptoHelper } from '../../../../@core/helpers/concepto/conceptoHelper';

@Component({
  selector: 'ngx-set-movimientocontable',
  templateUrl: './set-movimientocontable.component.html',
  styleUrls: ['./set-movimientocontable.component.scss']
})
export class SetMovimientocontableComponent implements OnInit {
  movimientoContable: FormGroup;
  configTableMovimientoContable: any;
  datosTableMovimientoContable: any;
  conceptosContables: any;

  constructor(private fb: FormBuilder, private conceptoHelper: ConceptoHelper) {
    this.configTableMovimientoContable = CONFIGURACION_MOVIMIENTO_CONTABLE;
    this.datosTableMovimientoContable = DATOS_MOVIMIENTO_CONTABLE;
  }

  ngOnInit() {
    this.conceptoHelper.getConceptos('').subscribe(res => {
        if (res) {
          this.conceptosContables = res;
        }
      }
    );
    this.movimientoContable = this.fb.group({
      conceptoContable: [null, [Validators.required]]
    });
  }
}
