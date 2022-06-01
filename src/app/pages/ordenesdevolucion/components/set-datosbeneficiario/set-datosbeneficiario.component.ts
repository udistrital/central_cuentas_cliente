import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { getDocumentos, subirDocumentos } from '../../../../shared/actions/shared.actions';
import { getFilaSeleccionada, selectDocumentos, selectDocumentosDescarga } from '../../../../shared/selectors/shared.selectors';
import { loadDocumentos } from '../../actions/ordenesdevolucion.actions';
import { CONFIGURACION_DOCUMENTOS } from '../../interfaces/interfaces';

@Component({
  selector: 'ngx-set-datosbeneficiario',
  templateUrl: './set-datosbeneficiario.component.html',
  styleUrls: ['./set-datosbeneficiario.component.scss']
})
export class SetDatosbeneficiarioComponent implements OnInit {
  @ViewChild('adjuntarArchivoModal', { static: false }) adjuntarArchivoModal: ElementRef;
  @ViewChild('eliminarDatoModal', { static: false }) eliminarDatoModal: ElementRef;

  datosBeneficiarioGroup: FormGroup;
  configuracion: any;
  datosDocumentos: any;
  subDocumentos$: any;
  subscriptionEliminarDato$: any;
  closeResult = '';

  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private translate: TranslateService,
    private modalService: NgbModal,
  ) {
    this.datosDocumentos = [];
    this.configuracion = CONFIGURACION_DOCUMENTOS;
   }

  ngOnInit() {
    this.createForm();
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

  // Modal acciones sobre la tabla: eliminar registros
  modalEliminar(fila: any) {
    this.modalService.open(this.eliminarDatoModal).result.then((result) => {
      if (`${result}`) {
        this.datosDocumentos.splice(this.datosDocumentos.findIndex(
          (element: any) => element.nombreDocumento === fila.nombreDocumento
            && element.nombreArchivo === fila.nombreArchivo && element.estado === fila.estado
        ), 1);
        this.store.dispatch(loadDocumentos({ DocumentosOrden: this.datosDocumentos }));
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  createForm() {
    this.datosBeneficiarioGroup = this.fb.group({
      tipoDocumento: [''],
      numeroDocumento: [''],
      nombreBeneficiario: [''],
      banco: [''],
      tipoCuenta: [''],
      numeroCuenta: [''],
      formaPago: [''],
      documentos: ['']
    });
  }

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
            nombreArchivo: documento[0].nombre,
            tamañoArchivo: Math.trunc(item.size / 1000) + ' KB',
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
}
