import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GetConceptosContables } from '../../../../shared/actions/shared.actions';
import { getConceptosContables } from '../../../../shared/selectors/shared.selectors';
import { DATOS_CONSULTAOP, CONFIGURACION_CONSULTAOP } from '../../interfaces/interfaces';
import { Store } from '@ngrx/store';
import { cargarDatosSolicitud } from '../../actions/devoluciontributaria.actions';

@Component({
  selector: 'ngx-set-infodevoluciontributaria',
  templateUrl: './set-infodevoluciontributaria.component.html',
  styleUrls: ['./set-infodevoluciontributaria.component.scss']
})
export class SetInfodevoluciontributariaComponent implements OnInit, OnDestroy {

  configConsultaOP: any;
  datosConsultaOP: any;
  infoDevolucionGroup: FormGroup;
  subscriptionConceptos$: any;
  conceptosContables: any;

  constructor(private fb: FormBuilder,
    private store: Store <any>,
    ) {
            // Datos de ejemplo q se muestran en la tabla
            this.datosConsultaOP = DATOS_CONSULTAOP;
            this.configConsultaOP = CONFIGURACION_CONSULTAOP;
            // Configuracion de la tabla
            // this.stringBusqueda = '';
            // this.selectedAction = new EventEmitter<any>();
            this.createForm();
            this.store.dispatch(GetConceptosContables({}));
  }

  ngOnInit() {
    // Conceptos contables
    this.subscriptionConceptos$ = this.store.select(getConceptosContables).subscribe((accion) => {
      if (accion && accion[0]) this.conceptosContables = accion[0];
    });
  }

  ngOnDestroy() {
    this.subscriptionConceptos$.unsubscribe();
  }

  // Validacion del Formulario
  get areaFuncionalInvalid() {
    return this.infoDevolucionGroup.get('areaFuncional').invalid && this.infoDevolucionGroup.get('areaFuncional').touched;
  }
  get fechaSolicitudInvalid() {
    return this.infoDevolucionGroup.get('fechaSolicitud').invalid && this.infoDevolucionGroup.get('fechaSolicitud').touched;
  }
  get tipoComprobanteInvalid() {
    return this.infoDevolucionGroup.get('tipoComprobante').invalid && this.infoDevolucionGroup.get('tipoComprobante').touched;
  }
  get tipoIdInvalid() {
    return this.infoDevolucionGroup.get('tipoId').invalid && this.infoDevolucionGroup.get('tipoId').touched;
  }
  get numeroIdInvalid() {
    return this.infoDevolucionGroup.get('numeroId').invalid && this.infoDevolucionGroup.get('numeroId').touched;
  }
  get requerimientoInvalid() {
    return this.infoDevolucionGroup.get('requerimiento').invalid && this.infoDevolucionGroup.get('requerimiento').touched;
  }
  get fechaInvalid() {
    return this.infoDevolucionGroup.get('fecha').invalid && this.infoDevolucionGroup.get('fecha').touched;
  }
  get conceptoInvalid() {
    return this.infoDevolucionGroup.get('concepto').invalid && this.infoDevolucionGroup.get('concepto').touched;
  }
  get razonDevolucionInvalid() {
    return this.infoDevolucionGroup.get('razonDevolucion').invalid && this.infoDevolucionGroup.get('razonDevolucion').touched;
  }


  createForm() {
    this.infoDevolucionGroup = this.fb.group({
      areaFuncional: ['', Validators.required],
      fechaSolicitud: ['', Validators.required],
      numeroComprobante: ['001', ],
      tipoComprobante: ['', Validators.required],
      tipoId: ['', Validators.required],
      numeroId: ['',
      [Validators.required,
      Validators.pattern('^[0-9]*$')]],
      requerimiento: ['',
      [Validators.required,
      Validators.pattern('^[0-9]*$')]],
      fecha: ['', Validators.required],
      concepto: ['', Validators.required],
      razonDevolucion: ['', Validators.required],
    });
  }

  saveForm(data: any) {
    if ( this.infoDevolucionGroup.invalid ) {
      return Object.values( this.infoDevolucionGroup.controls ).forEach( control => {
        control.markAsTouched();
      });
    } else {
      this.store.dispatch(cargarDatosSolicitud(data));
    }
  }

}
