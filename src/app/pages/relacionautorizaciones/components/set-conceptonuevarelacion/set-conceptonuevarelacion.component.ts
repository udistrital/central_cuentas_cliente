import { Component, EventEmitter, Output, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CONFIGURACION_TABLACONCEPTOS, DATOS_TABLACONCEPTOS } from '../../interfaces/interfaces';
import { Store } from '@ngrx/store';
import { getAccionTabla, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { loadRelacionautorizacionesSeleccionado } from '../../actions/relacionautorizaciones.actions';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-set-conceptonuevarelacion',
  templateUrl: './set-conceptonuevarelacion.component.html',
  styleUrls: ['./set-conceptonuevarelacion.component.scss']
})
export class SetConceptonuevarelacionComponent implements OnInit, OnDestroy {
  @ViewChild('verDesagregacionModal', { static: false }) verDesagregacionModal: ElementRef;
  closeResult: string;
  conceptoGroup: FormGroup;
  // Configuracion de datos ejemplo en la tabla
  configuracion: any;
  datosConcepto: any;
  subscription$: any;
  subscription: any;
  stringBusqueda: string;
  @Output() selectedAction: EventEmitter<any>;

  constructor(private fb: FormBuilder, private store: Store<any>, private modalService: NgbModal) {
    // Datos de ejemplo q se muestran en la tabla
    this.datosConcepto = DATOS_TABLACONCEPTOS;
    this.configuracion = CONFIGURACION_TABLACONCEPTOS;
    // Configuracion de la tabla
    this.stringBusqueda = '';
    this.selectedAction = new EventEmitter<any>();

    this.createForm();
   }

  ngOnInit() {
    // Tabla
    this.subscription$ = this.store.select(getFilaSeleccionada).subscribe((fila: any) => {
      if (fila) {
        this.store.dispatch(loadRelacionautorizacionesSeleccionado(fila.fila));
      }
    });
    this.subscription$ = this.store.select(getAccionTabla).subscribe((accion: any) => {
      this.store.dispatch(loadRelacionautorizacionesSeleccionado(null));
    });
    // Modal de la tabla para ver informacion de los registros
    this.subscription = this.store.select(getFilaSeleccionada).subscribe((accion) => {
      if (accion) {
        if (accion.accion.name === 'verDesagregacion' && accion.accion.idStep === 3) {
          this.modalService.open(this.verDesagregacionModal, { size: 'xl' });
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createForm() {
    this.conceptoGroup = this.fb.group({
      numeroRelacion: ['001', ],
    });
  }

  saveForm() {
    if ( this.conceptoGroup.invalid ) {
      return Object.values( this.conceptoGroup.controls ).forEach( control => {
        control.markAsTouched();
      });
    }
  }

}
