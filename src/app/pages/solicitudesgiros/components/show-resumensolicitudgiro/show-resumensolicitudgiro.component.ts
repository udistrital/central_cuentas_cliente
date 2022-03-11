import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getInfosolicitudes, getAutorizaciongiro, getDocumentosgiro } from '../../selectors/solicitudesgiros.selectors';
import { selectConsecutivo, selectDatosID, selectProcesoConfiguracion } from '../../../../shared/selectors/shared.selectors';
import { CONFIGURACION_DOCUMENTOS } from '../../interfaces/interfaces';
import { actualizarAutorizacionGiro, subirAutorizacionGiro } from '../../actions/solicitudesgiros.actions';
import { ActivatedRoute } from '@angular/router';
import { crearConsecutivo, getProcesoConfiguracion } from '../../../../shared/actions/shared.actions';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-show-resumensolicitudgiro',
  templateUrl: './show-resumensolicitudgiro.component.html',
  styleUrls: ['./show-resumensolicitudgiro.component.scss']
})
export class ShowResumensolicitudgiroComponent implements OnInit, OnDestroy {

  // Fin formulario
  resumenSolicitudGroup: FormGroup;
  motivoRechazoGroup: FormGroup;
  // Configuracion de la tabla
  configuracion: any;
  datosDocumentos: any;
  // Consulta de datos en el store
  subscriptionDatosSolicitante$: any;
  subscriptionDatosBeneficiario$: any;
  subscriptionInfosolicitud$: any;
  subscriptionAutorizacion$: any;
  subscriptionDocumentos$: any;
  subConsecutivo$: any;
  consecutivo: any;
  datosSolicitante: any;
  datosBeneficiario: any;
  infoSolicitudgiro: any;
  autorizacionGiro: any;
  subProceso$: any;
  proceso: any;
  // Icono en la Lista de documentos
  mostrarOcultar: string;
  mostrarOcultarIcono: string;
  tituloAccion: string;
  motivoRechazo: string;
  ocultar: boolean;

  constructor(private _formBuilder: FormBuilder,
    private store: Store<any>,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: NgbModal) {
    // Datos y configuracion de Tabla
    this.createForm();
    this.datosDocumentos = [];
    this.configuracion = Object.assign({}, CONFIGURACION_DOCUMENTOS);
    this.configuracion.rowActions = null;
    // Icono en la Lista de documentos
    this.mostrarOcultar = 'Mostrar';
    this.mostrarOcultarIcono = 'fa-eye';
    this.tituloAccion = this.activatedRoute.snapshot.url[0].path;
    this.store.dispatch(getProcesoConfiguracion({query: {Sigla: 'SAG'}}));
  }

  ngOnInit() {
    this.resumenSolicitudGroup = this._formBuilder.group({
    });

    this.subscriptionDatosSolicitante$ = this.store.select(selectDatosID, 'solicitante').subscribe((action) => {
      if (action && action.datosId && action.datosId[0]) {
        this.datosSolicitante = action.datosId[0];
      }
    });

    this.subscriptionDatosBeneficiario$ = this.store.select(selectDatosID, 'beneficiario').subscribe((action) => {
      if (action && action.datosId && action.datosId[0]) {
        this.datosBeneficiario = action.datosId[0];
      }
    });

    this.subscriptionInfosolicitud$ = this.store.select(getInfosolicitudes).subscribe((action) => {
      if (action && action.infosolicitud) {
        this.infoSolicitudgiro = action.infosolicitud;
      }
    });

    this.subscriptionAutorizacion$ = this.store.select(getAutorizaciongiro).subscribe((action) => {
      if (action && action.autorizaciongiro) {
        this.autorizacionGiro = action.autorizaciongiro;
      }
    });

    this.subscriptionDocumentos$ = this.store.select(getDocumentosgiro).subscribe((action) => {
      if (action && action.datosDocumentos) {
        this.datosDocumentos = action.datosDocumentos;
      }
    });

    this.subProceso$ = this.store.select(selectProcesoConfiguracion).subscribe((action) => {
      if (action && action.Proceso) {
        this.proceso = action.Proceso[0];
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptionAutorizacion$.unsubscribe();
    this.subscriptionDatosBeneficiario$.unsubscribe();
    this.subscriptionDatosSolicitante$.unsubscribe();
    this.subscriptionDocumentos$.unsubscribe();
    this.subscriptionInfosolicitud$.unsubscribe();
  }

  // Configuracion de Icono en lista documentos
  mostrarOcultarDocumentos(state: string) {
    if (state === 'false') {
      this.mostrarOcultarIcono = 'fa-eye-slash';
    } else {
      this.mostrarOcultarIcono = 'fa-eye';
    }
  }
  guardar(revisar: string) {
    const documentos = [];
    for (let index = 0; index < this.datosDocumentos.length; index++) {
      const documento = {
        NombreDocumento: this.datosDocumentos[index].nombreDocumento,
        NombreArchivo: this.datosDocumentos[index].nombreArchivo,
        UID: this.datosDocumentos[index].uid,
      };
      documentos.push(documento);
    }
    const elemento = {
      Activo: true,
      Area_Funcional: this.infoSolicitudgiro.areaFuncional.Id,
      Concepto: this.infoSolicitudgiro.concepto.Id,
      Documento_Solicitante: this.infoSolicitudgiro.numeroId,
      Tipo_Doc_Beneficiario: this.autorizacionGiro.tipoId.Id,
      Documento_Beneficiario: this.autorizacionGiro.numeroId,
      Nombre_Beneficiario: this.datosBeneficiario.TerceroId.NombreCompleto,
      Rubro: this.autorizacionGiro.rubroSeleccionado.data.Codigo,
      Valor_Letras: this.autorizacionGiro.valorLetras,
      Valor_Numeros: this.autorizacionGiro.valorNumero,
      Documentos: documentos,
      Estado: 'Elaborado',
      Numero_Solicitud: 0,
      Motivo_Rechazo: null,
    };
    if (this.tituloAccion === 'editar') {
      elemento.Numero_Solicitud = this.infoSolicitudgiro.numeroSolicitud;
      this.store.dispatch(actualizarAutorizacionGiro({id: this.activatedRoute.snapshot.url[1].path, element: elemento}));
    } else if (this.tituloAccion === 'revisar') {
      elemento.Numero_Solicitud = this.infoSolicitudgiro.numeroSolicitud;
      if (revisar === 'rechazar') this.rechazar(elemento);
      else if (revisar === 'aprobar') this.aprobar(elemento);
    } else {
      const consecutivo = {
        ContextoId: this.proceso.Id,
        Year: new Date().getFullYear(),
        Descripcion: 'Solicitud de autorización de giro'
      };
      this.store.dispatch(crearConsecutivo({element: consecutivo}));
      this.subConsecutivo$ = this.store.select(selectConsecutivo).subscribe((accion) => {
        if (accion && accion.Consecutivos) {
          elemento.Numero_Solicitud = accion.Consecutivos.Consecutivo;
          this.store.dispatch(subirAutorizacionGiro({element: elemento}));
        }
      });
    }
  }

  rechazar(elemento: any) {
    Swal.fire({
      title: 'Rechazar',
      text: '¿Seguro que deseas rechazar esta solicitud?',
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d00000',
      confirmButtonColor: 'rgb(243, 161, 9)',
      confirmButtonText: 'Si, rechazar'
    }).then((result) => {
      if (result.value === true) {
        elemento.Motivo_Rechazo = this.motivoRechazo;
        elemento.Estado = 'Rechazado';
        this.store.dispatch(actualizarAutorizacionGiro({id: this.activatedRoute.snapshot.url[1].path, element: elemento}));
      }
    });
  }

  aprobar(elemento: any) {
    Swal.fire({
      title: 'Aprobar',
      text: '¿Seguro que deseas aprobar esta solicitud?',
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d00000',
      confirmButtonColor: 'rgb(243, 161, 9)',
      confirmButtonText: 'Si, aprobar'
    }).then((result) => {
      if (result.value === true) {
        elemento.Estado = 'Aprobado';
        this.store.dispatch(actualizarAutorizacionGiro({id: this.activatedRoute.snapshot.url[1].path, element: elemento}));
      }
    });
  }

  createForm() {
    this.motivoRechazoGroup = this.fb.group({
      motivoRechazo: ['', Validators.required]
    });
  }

  // get motivoRechazoValid() {
  //   return this.infoSolicitudGroup.get('cargo').invalid && this.infoSolicitudGroup.get('cargo').touched;
  // }

  isInvalid(nombre: string) {
    const input = this.motivoRechazoGroup.get(nombre);
    if (input)
      return input.invalid && (input.touched || input.dirty);
    else
      return true;
  }

  saveForm() {
    if (this.motivoRechazoGroup.invalid) {
      return Object.values(this.motivoRechazoGroup.controls).forEach(control => {
        control.markAsTouched();
      });
    } else {
      this.ocultar = true;
      this.guardar('rechazar');
    }
  }
}
