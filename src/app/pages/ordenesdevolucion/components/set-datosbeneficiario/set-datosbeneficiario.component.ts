import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest } from 'rxjs';
import Swal from 'sweetalert2';
import { getBancos, getDatosID, getDocumentos, getFormasPago, getParametros, subirDocumentos } from '../../../../shared/actions/shared.actions';
import { getFilaSeleccionada, selectBancos, selectDatosID, selectDocumentos, selectDocumentosDescarga, selectFormasPago,
          selectOrdenDEvolucionById, selectParametros, selectTiposID } from '../../../../shared/selectors/shared.selectors';
import { cargarDocumentosBeneficiario, loadDocumentos } from '../../actions/ordenesdevolucion.actions';
import { CONFIGURACION_DOCUMENTOS } from '../../interfaces/interfaces';
import { cargarDatosBeneficiario } from '../../actions/ordenesdevolucion.actions';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'ngx-set-datosbeneficiario',
  templateUrl: './set-datosbeneficiario.component.html',
  styleUrls: ['./set-datosbeneficiario.component.scss']
})
export class SetDatosbeneficiarioComponent implements OnInit, OnDestroy {
  @ViewChild('adjuntarArchivoModal', { static: false }) adjuntarArchivoModal: ElementRef;
  @ViewChild('eliminarDatoModal', { static: false }) eliminarDatoModal: ElementRef;

  datosBeneficiarioGroup: FormGroup;
  configuracion: any;
  datosDocumentos: any;
  subDocumentos$: any;
  subscriptionEliminarDato$: any;
  closeResult = '';
  subTipoDocumento$: any;
  tiposDocumento: any;
  subBancos$: any;
  bancos: any;
  subTipoCuenta$: any;
  tiposCuenta: any;
  subFormasPago$: any;
  formasPago: any;
  subscriptionfilter$: any;
  subDatosBeneficiario$: any;
  datosBeneficiario: any;
  subOrdenDevolucion$: any;
  ordenDevolucion: any;
  flagOD: boolean;
  tituloAccion: string;
  editable: boolean;

  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private translate: TranslateService,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
  ) {
    this.flagOD = true;
    this.editable = true;
    this.datosDocumentos = [];
    this.configuracion = CONFIGURACION_DOCUMENTOS;
    this.store.dispatch(getBancos({query: {TipoTerceroId__CodigoAbreviacion: 'BANCO'}}));
    this.store.dispatch(getParametros({query: {TipoParametroId__CodigoAbreviacion: 'CB'}}));
    this.store.dispatch(getFormasPago({query: {TipoParametroId__CodigoAbreviacion: 'F_PAGO'}}));
    this.tituloAccion = this.activatedRoute.snapshot.url[0].path;
    if (this.mostrar(this.tituloAccion)) {
      if (this.edit(this.tituloAccion)) {
        this.editable = false;
        this.configuracion.rowActions.actions[0].ngIf = false;
      }
    } else {
      this.consultaTipoDocumento();
    }
    for (let i = 0; i < this.configuracion.dataConfig.length; i++) {
      this.configuracion.dataConfig[i].title.name = this.translate.instant('ORDEN_DEVOLUCION.' + this.configuracion.dataConfig[i].title.label_i18n);
    }
   }
  ngOnDestroy() {
    this.subDatosBeneficiario$.unsubscribe();
    this.subTipoDocumento$.unsubscribe();
    this.subBancos$.unsubscribe();
    if (this.subTipoCuenta$) this.subTipoCuenta$.unsubscribe();
    if (this.subFormasPago$) this.subFormasPago$.unsubscribe();
    if (this.subscriptionEliminarDato$) this.subscriptionEliminarDato$.unsubscribe();
    if (this.subscriptionfilter$) this.subscriptionfilter$.unsubscribe();
    if (this.subDocumentos$) this.subDocumentos$.unsubscribe();
    this.datosDocumentos = [];
    if (this.subOrdenDevolucion$) this.subOrdenDevolucion$.unsubscribe();
    this.ordenDevolucion = null;

  }

   private mostrar(action: string): boolean {
    const ACCIONES: string[] = ['ver', 'editar', 'revisar'];
    return ACCIONES.some(acc => acc === action);
  }

  private edit(action: string): boolean {
    const ACCIONES_EDICION: string[] = ['ver', 'revisar'];
    return ACCIONES_EDICION.some(acc => acc === action);
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
    this.subscriptionfilter$ = combineLatest([
      this.datosBeneficiarioGroup.get('tipoDocumento').valueChanges,
      this.datosBeneficiarioGroup.get('numeroDocumento').valueChanges,
    ]).subscribe(([tipoId, numeroId]) => {
      if (numeroId && tipoId) {
        this.store.dispatch(getDatosID({ clave: 'beneficiario1', numero: numeroId, tipo: tipoId.Id }));
      }
    });
    this.subDatosBeneficiario$ = this.store.select(selectDatosID, 'beneficiario1').subscribe(action1 => {
      if (action1 && action1.datosId[0].TerceroId) {
        this.datosBeneficiario = action1.datosId[0];
        this.datosBeneficiarioGroup.patchValue({
          nombreBeneficiario: this.datosBeneficiario.TerceroId.NombreCompleto
        });
      }
    });
    this.subOrdenDevolucion$ = this.store.select(selectOrdenDEvolucionById).subscribe((action) => {
      if (this.flagOD && action && action.OrdenDevolucionById) {
        this.ordenDevolucion = action.OrdenDevolucionById;
        this.flagOD = false;
        this.consultaTipoDocumento();
      }
    });
  }

  // Modal acciones sobre la tabla: Ver documentos
  modalVer(fila: any) {
    this.store.dispatch(getDocumentos({uid: fila.UID}));
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
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', Validators.required],
      nombreBeneficiario: ['', Validators.required],
      banco: ['', Validators.required],
      tipoCuenta: ['', Validators.required],
      numeroCuenta: ['', Validators.required],
      formaPago: ['', Validators.required],
      documentos: [''],
      validator: ['', Validators.required],
      motivoDevolucion: ['', Validators.required]
    });
  }

  consultaTipoDocumento() {
    this.subTipoDocumento$ = this.store.select(selectTiposID).subscribe(action => {
      if (action) {
        this.tiposDocumento = action[0];
        this.consultaBancos();
      }
    });
  }

  consultaBancos() {
    this.subBancos$ = this.store.select(selectBancos).subscribe(action => {
      if (action && action.Bancos) {
        this.bancos = action.Bancos;
        action.Bancos = null;
        this.consultaTipoCuenta();
      }
    });
  }

  consultaTipoCuenta() {
    this.subTipoCuenta$ = this.store.select(selectParametros).subscribe(action => {
      if (action && action.Parametros) {
        this.tiposCuenta = action.Parametros;
        action.Parametros = null;
        this.consultaFormaPago();
      }
    });
  }

  consultaFormaPago() {
    this.subFormasPago$ = this.store.select(selectFormasPago).subscribe(action => {
      if (action && action.FormasPago) {
        this.formasPago = action.FormasPago;
        action.FormasPago = null;
        this.ordenDevolucionId();
      }
    });
  }

  ordenDevolucionId() {
    if (this.mostrar(this.tituloAccion) && this.datosBeneficiarioGroup) {
      this.datosBeneficiarioGroup.patchValue({
        tipoDocumento: this.tiposDocumento.find((e: any) => e.Id === this.ordenDevolucion.TipoDocumentoBeneficiario),
        numeroDocumento: this.ordenDevolucion.NumeroDocumentoBeneficiario,
        nombreBeneficiario: this.ordenDevolucion.NombreBeneficiario,
        banco: this.bancos.find((e: any) => e.Id === this.ordenDevolucion.Banco),
        tipoCuenta: this.tiposCuenta.find((e: any) => e.Id === this.ordenDevolucion.TipoCuenta),
        numeroCuenta: this.ordenDevolucion.NumeroCuenta,
        formaPago: this.formasPago.find((e: any) => e.Id === this.ordenDevolucion.FormaPago),
        motivoDevolucion: this.ordenDevolucion.MovimientoContable[0].Detalle
      });
      this.datosDocumentos = this.ordenDevolucion.DocumentosBeneficiario;
    }
  }

  saveForm(data: any) {
    if (this.datosDocumentos.length > 0) {
      this.validator();
    }
    if ( this.datosBeneficiarioGroup.invalid) {
      return Object.values( this.datosBeneficiarioGroup.controls ).forEach( control => {
        control.markAsTouched();
      });
    } else {
      this.store.dispatch(cargarDatosBeneficiario(data));
    }
  }

  cargarDocumentos() {
    this.store.dispatch(cargarDocumentosBeneficiario({data: this.datosDocumentos}));
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
            NombreArchivo: documento[0].nombre,
            TamañoArchivo: Math.trunc(item.size / 1000) + ' KB',
            Estado: 'Listo',
            UID: accion.DocumentosCarga.res.Enlace
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

  get tipoDocumentoInvalid() {
    return this.datosBeneficiarioGroup.get('tipoDocumento').invalid && this.datosBeneficiarioGroup.get('tipoDocumento').touched;
  }
  get numeroDocumentoInvalid() {
    return this.datosBeneficiarioGroup.get('numeroDocumento').invalid && this.datosBeneficiarioGroup.get('numeroDocumento').touched;
  }
  get nombreBeneficiarioInvalid() {
    return this.datosBeneficiarioGroup.get('nombreBeneficiario').invalid && this.datosBeneficiarioGroup.get('nombreBeneficiario').touched;
  }
  get bancoInvalid() {
    return this.datosBeneficiarioGroup.get('banco').invalid && this.datosBeneficiarioGroup.get('banco').touched;
  }
  get tipoCuentaInvalid() {
    return this.datosBeneficiarioGroup.get('tipoCuenta').invalid && this.datosBeneficiarioGroup.get('tipoCuenta').touched;
  }
  get numeroCuentaInvalid() {
    return this.datosBeneficiarioGroup.get('numeroCuenta').invalid && this.datosBeneficiarioGroup.get('numeroCuenta').touched;
  }
  get formaPagoInvalid() {
    return this.datosBeneficiarioGroup.get('formaPago').invalid && this.datosBeneficiarioGroup.get('formaPago').touched;
  }
  get motivoDevolucionInvalid() {
    return this.datosBeneficiarioGroup.get('motivoDevolucion').invalid && this.datosBeneficiarioGroup.get('motivoDevolucion').touched;
  }

  private validator() {
    this.datosBeneficiarioGroup.patchValue({
      validator: 'a'
    });
  }
}
