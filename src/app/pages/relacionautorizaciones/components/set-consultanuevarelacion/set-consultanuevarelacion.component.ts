import { Component, EventEmitter, Output, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CONFIGURACION_TABLACONSULTA, DATOS_TABLACONSULTA } from '../../interfaces/interfaces';
import { Store } from '@ngrx/store';
import { getAccionTabla, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { loadRelacionautorizacionesSeleccionado } from '../../actions/relacionautorizaciones.actions';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-set-consultanuevarelacion',
  templateUrl: './set-consultanuevarelacion.component.html',
  styleUrls: ['./set-consultanuevarelacion.component.scss']
})
export class SetConsultanuevarelacionComponent implements OnInit, OnDestroy {
  @ViewChild('eliminarDatoModal', { static: false }) eliminarDatoModal: ElementRef;

  consultaGroup: FormGroup;
  // Configuracion de datos ejemplo en la tabla
  configuracion: any;
  datosConsulta: any;
  subscription$: any;
  subscription: any;
  stringBusqueda: string;
  @Output() selectedAction: EventEmitter<any>;

  constructor( private fb: FormBuilder, private store: Store<any>, private modalService: NgbModal) {
        // Datos de ejemplo q se muestran en la tabla
        this.datosConsulta = DATOS_TABLACONSULTA;
        this.configuracion = CONFIGURACION_TABLACONSULTA;
        // Configuracion de la tabla
        this.stringBusqueda = '';
        this.selectedAction = new EventEmitter<any>();

        this.createForm();
   }

  // Validacion del Formulario
  get disponibilidadInvalid() {
    return this.consultaGroup.get('codigoDisponibilidad').invalid && this.consultaGroup.get('codigoDisponibilidad').touched;
  }
  get registroInvalid() {
    return this.consultaGroup.get('codigoRegistro').invalid && this.consultaGroup.get('codigoRegistro').touched;
  }

  ngOnInit() {
    // Eliminar datos que se encuentran en la tabla
    this.subscription = this.store.select(getFilaSeleccionada).subscribe((accion) => {
      if (accion) {
        if (accion.accion.name === 'BorrarRegistroConsulta' && accion.accion.idStep === 2) {
          this.modalEliminar(accion.fila);
        }
      }
    });
    // Mostrar datos ingresados en la tabla
    this.mostrarDatos();
       this.subscription$ = this.store.select(getFilaSeleccionada).subscribe((fila: any) => {
        if (fila) {
          this.store.dispatch(loadRelacionautorizacionesSeleccionado(fila.fila));
        }
      });
      this.subscription$ = this.store.select(getAccionTabla).subscribe((accion: any) => {
        this.store.dispatch(loadRelacionautorizacionesSeleccionado(null));
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createForm() {
    this.consultaGroup = this.fb.group({
      codigoDisponibilidad: ['',
        [Validators.required,
        Validators.pattern('^[0-9]*$')]
      ],
      codigoRegistro: ['',
      [Validators.required,
      Validators.pattern('^[0-9]*$')]
    ],
    });
  }

  saveForm() {
    if ( this.consultaGroup.invalid ) {
      return Object.values( this.consultaGroup.controls ).forEach( control => {
        control.markAsTouched();
      });
    }
  }

  // Evento con el boton mostrar datos en la tabla
  mostrarDatos() {
    this.datosConsulta.push(DATOS_TABLACONSULTA[0]);
  }

  // Modal acciones sobre la tabla: eliminar registros
  modalEliminar(fila: any) {
    this.modalService.open(this.eliminarDatoModal).result.then((result) => {
      if (`${result}`) {
        this.datosConsulta.splice(this.datosConsulta.findIndex(
          (element: any) => element.disponibilidad === fila.disponibilidad
          && element.registro === fila.registro
          ), 1);
      }
    });
  }

}
