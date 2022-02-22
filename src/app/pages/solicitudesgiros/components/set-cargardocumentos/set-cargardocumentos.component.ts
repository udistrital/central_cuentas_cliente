import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getAccionTabla, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { loadSolicitudgiroSeleccionado, loadDocumentos } from '../../actions/solicitudesgiros.actions';
import { CONFIGURACION_DOCUMENTOS, DATOS_DOCUMENTOS } from '../../interfaces/interfaces';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { cargarDocumentos, LoadFilaSeleccionada } from '../../../../shared/actions/shared.actions';
import { NuxeoService } from '../../../../@core/utils/nuxeo.service';
import { DocumentoService } from '../../../../@core/utils/documento.service';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
  selector: 'ngx-set-cargardocumentos',
  templateUrl: './set-cargardocumentos.component.html',
  styleUrls: ['./set-cargardocumentos.component.scss']
})
export class SetCargardocumentosComponent implements OnInit, OnDestroy {
  @ViewChild('eliminarDatoModal', { static: false }) eliminarDatoModal: ElementRef;

  // Configuracion y datos de la tabla
  configuracion: any;
  datosDocumentos: any;
  // Modal Eliminar Registros
  closeResult = '';
  // Cambios en la tabla
  subscription$: any;
  subscriptionEliminarDato$: any;
  // Formulario
  documentosGroup: FormGroup;
  fileDocumento: any;
  uidDocumento: any;
  idDocumento: any;

  constructor(private store: Store<any>, private fb: FormBuilder, private modalService: NgbModal, private nuxeoService: NuxeoService, private documentoService: DocumentoService) {

    // Datos y configuracion de Tabla
    this.datosDocumentos = DATOS_DOCUMENTOS;
    this.configuracion = CONFIGURACION_DOCUMENTOS;
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
  get documentosValid() {
    return this.documentosGroup.get('documentos').valid;
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

  // Modal acciones sobre la tabla: eliminar registros
  modalEliminar(fila: any) {
    this.modalService.open(this.eliminarDatoModal).result.then((result) => {
      if (`${result}`) {
        this.datosDocumentos.splice(this.datosDocumentos.findIndex(
          (element: any) => element.nombreDocumento === fila.nombreDocumento
            && element.nombreArchivo === fila.nombreArchivo && element.estado === fila.estado
        ), 1);
        this.store.dispatch(loadDocumentos({ datosDocumentos: this.datosDocumentos }));
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

  // Envio de datos de la tabla al Store
  async prepareFilesList(files: Array<File>) {
    for (const item of files) {
      this.datosDocumentos.push({ nombreDocumento: this.documentosGroup.get('documentos').value, nombreArchivo: item.name, estado: 'Listo', file: item });
      this.store.dispatch(loadDocumentos({ datosDocumentos: this.datosDocumentos }));
      const documento = [{
        IdTipoDocumento: 6,
        nombre: item.name,
        metadatos: {},
        descripcion: 'documento prueba',
        file: await this.fileToBase64(item)
      }];
      this.store.dispatch(cargarDocumentos({element: documento}));
    }
  }

  fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
        if ((encoded.length % 4) > 0) {
          encoded += '='.repeat(4 - (encoded.length % 4));
        }
        resolve(encoded);
      };
      reader.onerror = error => reject(error);
    });
  }

  async postSoporteNuxeo(files: any) {
    return new Promise(async (resolve, reject) => {
      files.forEach((file) => {
        (file.Id = file.name),
        (file.nombre = 'soporte_' + file.Id + '_central_cuentas'),
        (file.key = 'soporte_' + file.Id);
      });
      await this.nuxeoService.getDocumentos$(files, this.documentoService)
        .subscribe(response => {
            files.forEach((file, index) => {
              this.uidDocumento = file.uid;
              this.idDocumento = response[file.key].Id;
              files = [];
              resolve(response[file.key].Id);
            });
        }, error => {
          reject(error);
        });
    });
  }
}
