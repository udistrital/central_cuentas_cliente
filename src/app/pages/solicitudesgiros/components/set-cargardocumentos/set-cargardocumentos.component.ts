import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getAccionTabla, getFilaSeleccionada, selectDocumentos, selectDocumentosDescarga, selectSolicitudesGiro, selectTiposDocumentos } from '../../../../shared/selectors/shared.selectors';
import { loadSolicitudgiroSeleccionado, loadDocumentos } from '../../actions/solicitudesgiros.actions';
import { ACCIONES_DISABLED, ACCIONES_EDI, CONFIGURACION_DOCUMENTOS } from '../../interfaces/interfaces';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { subirDocumentos, LoadFilaSeleccionada, getDocumentos, getTiposDocumentos } from '../../../../shared/actions/shared.actions';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

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
  subDocumentos$: any;
  tituloAccion: string;
  subSolicitudesGiro$: any;
  solicitudesGiro: any;
  tiposDocumentos: any;
  subTiposDocumentos$: any;
  documentosValid: boolean;
  ver: boolean;
  flag: boolean;

  constructor(private store: Store<any>,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    ) {
    // Datos y configuracion de Tabla
    this.datosDocumentos = [];
    this.configuracion = CONFIGURACION_DOCUMENTOS;
    this.createForm();
    this.store.dispatch(getTiposDocumentos({query: {TipoParametroId__CodigoAbreviacion: 'DOC_SOAG'}}));
    this.tituloAccion = this.activatedRoute.snapshot.url[0].path;
    this.ver = ACCIONES_DISABLED.some(accion => accion === this.tituloAccion);
  }

  ngOnInit() {
    this.flag = true;
    // Configuracion de Tabla
    this.subscription$ = this.store.select(getFilaSeleccionada).subscribe((fila: any) => {
      if (fila) {
        this.store.dispatch(loadSolicitudgiroSeleccionado(fila.fila));
      }
    });
    this.subscription$ = this.store.select(getAccionTabla).subscribe((accion: any) => {
      this.store.dispatch(loadSolicitudgiroSeleccionado(null));
    });

    this.subTiposDocumentos$ = this.store.select(selectTiposDocumentos).subscribe((accion) => {
      if (accion && accion.TiposDocumentos) {
        this.tiposDocumentos = accion.TiposDocumentos;
      }
    });

    // Eliminar datos que se encuentran en la tabla
    this.subscriptionEliminarDato$ = this.store.select(getFilaSeleccionada).subscribe((accion) => {
      if (accion && accion.accion) {
        if (accion.accion.name === 'BorrarRegistro') {
          this.modalEliminar(accion.fila);
        }
        if (accion.accion.name === 'VerDocumento') {
          this.modalVer(accion.fila);
        }
      }
    });


    if (ACCIONES_EDI.some(accion => accion === this.tituloAccion)) {
      this.subSolicitudesGiro$ = this.store.select(selectSolicitudesGiro).subscribe((accion) => {
        if (accion && accion.SolicitudesById) {
          this.solicitudesGiro = accion.SolicitudesById;
          this.setDocumentos();
        }
      });
    }
  }

  isInvalid(nombre: string) {
    const input = this.documentosGroup.get(nombre);
    if (input) {
      if (this.datosDocumentos.length === 0) return input.invalid && (input.touched || input.dirty);
    } else
      return true;
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.store.dispatch(LoadFilaSeleccionada(null));
    this.subscriptionEliminarDato$.unsubscribe();
    this.datosDocumentos = [];
  }

  setDocumentos() {
    if (this.flag) {
      this.flag = false;
      for (let i = 0; i < this.solicitudesGiro.Documentos.length; i++) {
        this.datosDocumentos.push({
          nombreDocumento: this.solicitudesGiro.Documentos[i].NombreDocumento,
          nombreArchivo: this.solicitudesGiro.Documentos[i].NombreArchivo,
          estado: 'Listo',
          uid: this.solicitudesGiro.Documentos[i].UID});
      }
    }
  }

  selection() {
    this.documentosValid = true;
  }
  // Validacion de formulario
  get documentosInvalid() {
    return this.documentosGroup.get('documentos').invalid && this.documentosGroup.get('documentos').touched;
  }

  createForm() {
    this.documentosGroup = this.fb.group({
      documentos: [''],
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

  // Modal acciones sobre la tabla: Ver documentos
  modalVer(fila: any) {
    this.store.dispatch(getDocumentos({uid: fila.uid}));
    this.subDocumentos$ = this.store.select(selectDocumentosDescarga).subscribe((accion) => {
      if (accion && accion.DocumentosDescarga) {
        const base64 = accion.DocumentosDescarga.file;
        const pdfName = accion.DocumentosDescarga['dc:title'];
        accion.DocumentosDescarga = null;
        const imageBlob = this.dataURItoBlob(base64);
        const imageFile = new File([imageBlob], pdfName, { type: 'application/pdf' });
        const file = new Blob([imageFile], {type: 'application/pdf'});
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      }
    });
  }
  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'application/pdf' });
    return blob;
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
      let documento = [{
        IdTipoDocumento: 2,
        nombre: item.name,
        metadatos: {},
        descripcion: 'documento prueba',
        file: await this.fileToBase64(item)
      }];
      this.store.dispatch(subirDocumentos({element: documento}));
      this.subDocumentos$ = this.store.select(selectDocumentos).subscribe((accion) => {
        if (accion && accion.DocumentosCarga && documento.length > 0) {
          this.datosDocumentos.push({
            nombreDocumento: this.documentosGroup.get('documentos').value.Nombre,
            nombreArchivo: documento[0].nombre,
            estado: 'Listo',
            uid: accion.DocumentosCarga.res.Enlace
          });
          accion.DocumentosCarga = null;
          documento = [];
        } else if (!accion || !accion.DocumentosCarga) {
          Swal.fire({
            title: this.translate.instant('GLOBAL.espera'),
            html:  this.translate.instant('GLOBAL.cargando_documento'),
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            },
        });
        }
      });
    }
  }

  cargarDocumentos() {
    this.store.dispatch(loadDocumentos({ datosDocumentos: this.datosDocumentos }));
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
}
