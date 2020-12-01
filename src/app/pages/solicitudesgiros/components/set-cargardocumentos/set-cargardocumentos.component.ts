import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { getAccionTabla, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { loadSolicitudgiroSeleccionado } from '../../actions/solicitudesgiros.actions';
import { CONFIGURACION_DOCUMENTOS, DATOS_DOCUMENTOS } from '../../interfaces/interfaces';

@Component({
  selector: 'ngx-set-cargardocumentos',
  templateUrl: './set-cargardocumentos.component.html',
  styleUrls: ['./set-cargardocumentos.component.scss']
})
export class SetCargardocumentosComponent implements OnInit {

  configuracion: any;
  datosDocumentos: any;
  subscription$: any;

  documentosGroup: FormGroup;

  constructor(private store: Store<any>, private fb: FormBuilder, config: NgbModalConfig, private modalService: NgbModal) {

    // Datos y configuracion de Tabla
    this.datosDocumentos = DATOS_DOCUMENTOS;
    this.configuracion = CONFIGURACION_DOCUMENTOS;

    config.backdrop = 'static';
    config.keyboard = false;

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
    if ( this.documentosGroup.invalid ) {
      return Object.values( this.documentosGroup.controls ).forEach( control => {
        control.markAsTouched();
      });
    }
  }
// Modal Cargar Archivos
  open(content) {
    this.modalService.open(content);
  }

}
