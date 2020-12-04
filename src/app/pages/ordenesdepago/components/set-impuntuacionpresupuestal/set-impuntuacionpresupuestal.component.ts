import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { 
  CONFIGURACION_HISTORIAL, DATOS_HISTORIAL,
  CONFIGURACION_IMPUNTUACION, DATOS_IMPUNTUACION
 } from '../../interfaces/interfaces';

@Component({
  selector: 'ngx-set-impuntuacionpresupuestal',
  templateUrl: './set-impuntuacionpresupuestal.component.html',
  styleUrls: ['./set-impuntuacionpresupuestal.component.scss']
})
export class SetImpuntuacionpresupuestalComponent implements OnInit {
  impuntuacionPresupuestal: FormGroup;
  configTableHistorial: any;
  datosTableHistorial: any;
  configTableImpuntuacion: any;
  datosTableImpuntuacion: any;

  constructor(private fb: FormBuilder) {
    this.configTableHistorial = CONFIGURACION_HISTORIAL;
    this.datosTableHistorial = DATOS_HISTORIAL;
    this.configTableImpuntuacion = CONFIGURACION_IMPUNTUACION;
    this.datosTableImpuntuacion = DATOS_IMPUNTUACION;
  }

  ngOnInit() {
    this.impuntuacionPresupuestal = this.fb.group({
      firstCtrl: ['', Validators.required]
    });
  }
}
