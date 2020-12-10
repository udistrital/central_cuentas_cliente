import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CONFIGURACION_TABLACONSULTA, DATOS_TABLACONSULTA } from '../../interfaces/interfaces';
import { Store } from '@ngrx/store';
import { getAccionTabla, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { loadRelacionautorizacionesSeleccionado } from '../../actions/relacionautorizaciones.actions';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'ngx-set-consultanuevarelacion',
  templateUrl: './set-consultanuevarelacion.component.html',
  styleUrls: ['./set-consultanuevarelacion.component.scss']
})
export class SetConsultanuevarelacionComponent implements OnInit{

  consultaGroup: FormGroup;
  
  // Configuracion de datos ejemplo en la tabla
  configuracion: any;
  datosConsulta: any;
  subscription$: any;
  
  @Output() selectedAction: EventEmitter<any>;
  stringBusqueda: string;

  constructor( private fb: FormBuilder, private store: Store<any>) {
        // Datos de ejemplo q se muestran en la tabla
        this.datosConsulta = DATOS_TABLACONSULTA;
        this.configuracion = CONFIGURACION_TABLACONSULTA;
        // Configuracion de la tabla
        this.stringBusqueda = '';
        this.selectedAction = new EventEmitter<any>();

        this.createForm();
   }

  ngOnInit(){
       // Tabla
       this.subscription$ = this.store.select(getFilaSeleccionada).subscribe((fila: any) => {
        if (fila) {
          this.store.dispatch(loadRelacionautorizacionesSeleccionado(fila.fila));
        }
      });
      this.subscription$ = this.store.select(getAccionTabla).subscribe((accion: any) => {
        this.store.dispatch(loadRelacionautorizacionesSeleccionado(null));
      });
  }

  createForm() {
    this.consultaGroup = this.fb.group({
      numeroRelacion: ['001', ],
    });
  }

  saveForm() {
    if ( this.consultaGroup.invalid ) {
      return Object.values( this.consultaGroup.controls ).forEach( control => {
        control.markAsTouched();
      });
    }
  }

}
