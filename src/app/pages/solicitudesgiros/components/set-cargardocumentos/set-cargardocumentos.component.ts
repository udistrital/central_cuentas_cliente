import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getAccionTabla, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { loadSolicitudgiroSeleccionado, loadDocumentos } from '../../actions/solicitudesgiros.actions';
import { CONFIGURACION_DOCUMENTOS, DATOS_DOCUMENTOS } from '../../interfaces/interfaces';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LoadFilaSeleccionada } from '../../../../shared/actions/shared.actions';

@Component({
  selector: 'ngx-set-cargardocumentos',
  templateUrl: './set-cargardocumentos.component.html',
  styleUrls: ['./set-cargardocumentos.component.scss']
})
export class SetCargardocumentosComponent implements OnInit, OnDestroy {
  @ViewChild('eliminarDatoModal', { static: false }) eliminarDatoModal: ElementRef;

  configuracion: any;
  datosDocumentos: any;
  closeResult = '';
  cargarDatos: any;
  subscription$: any;
  subscriptionEliminarDato$: any;

  documentosGroup: FormGroup;

  constructor(private store: Store<any>, private fb: FormBuilder, private modalService: NgbModal) {

    // Datos y configuracion de Tabla
    this.datosDocumentos = DATOS_DOCUMENTOS;
    this.configuracion = CONFIGURACION_DOCUMENTOS;
    this.store.dispatch(loadDocumentos({ datosDocumentos: this.datosDocumentos }));

    this.createForm();
  }

  ngOnInit() {

    // Configuracion de Tabla
    this.subscription$ = this.store.select(getFilaSeleccionada).subscribe((fila: any) => {
      if (fila) {
        this.store.dispatch(loadSolicitudgiroSeleccionado(fila.fila));
      }
    });
    this.subscription$ = this.store.select(getAccionTabla).subscribe((accion: any) => {
      this.store.dispatch(loadSolicitudgiroSeleccionado(null));
    });

     // Eliminar datos que se encuentran en la tabla
     this.subscriptionEliminarDato$ = this.store.select(getFilaSeleccionada).subscribe((accion) => {
      if (accion && accion.accion) {
        if (accion.accion.name === 'BorrarRegistro') {
          this.modalEliminar(accion.fila);
        }
      }
    });

    // Mostrar datos ingresados en la tabla
    this.mostrarDatos();

  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.store.dispatch(LoadFilaSeleccionada(null));
    this.subscriptionEliminarDato$.unsubscribe();
  }

  // Validacion de formulario
  get documentosInvalid() {
    return this.documentosGroup.get('documentos').invalid && this.documentosGroup.get('documentos').touched;
  }

  createForm() {
    this.documentosGroup = this.fb.group({
      documentos: ['', Validators.required],
    });
  }

  saveForm() {
    if (this.documentosGroup.invalid) {
      return Object.values(this.documentosGroup.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

    // Evento con el boton mostrar datos en la tabla
    mostrarDatos() {
      this.cargarDatos.push(DATOS_DOCUMENTOS[0]);
      // this.store.dispatch()
    }

   // Modal acciones sobre la tabla: eliminar registros
   modalEliminar(fila: any) {
    this.modalService.open(this.eliminarDatoModal).result.then((result) => {
      if (`${result}`) {
        this.cargarDatos.splice(this.cargarDatos.findIndex(
          (element: any) => element.nombreDocumento === fila.nombreDocumento
          && element.nombreArchivo === fila.nombreArchivo
          ), 1);
          // this.store.dispatch()
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
