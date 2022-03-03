import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getInfosolicitudes, getAutorizaciongiro, getDocumentosgiro } from '../../selectors/solicitudesgiros.selectors';
import { selectConsecutivo, selectDatosID, selectProcesoConfiguracion } from '../../../../shared/selectors/shared.selectors';
import { CONFIGURACION_DOCUMENTOS } from '../../interfaces/interfaces';
import { actualizarAutorizacionGiro, subirAutorizacionGiro } from '../../actions/solicitudesgiros.actions';
import { ActivatedRoute } from '@angular/router';
import { crearConsecutivo, getProcesoConfiguracion } from '../../../../shared/actions/shared.actions';

@Component({
  selector: 'ngx-show-resumensolicitudgiro',
  templateUrl: './show-resumensolicitudgiro.component.html',
  styleUrls: ['./show-resumensolicitudgiro.component.scss']
})
export class ShowResumensolicitudgiroComponent implements OnInit, OnDestroy {

  // Fin formulario
  resumenSolicitudGroup: FormGroup;
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

  constructor(private _formBuilder: FormBuilder,
    private store: Store<any>,
    private activatedRoute: ActivatedRoute) {

    // Datos y configuracion de Tabla
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
  guardar() {
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
      Numero_Solicitud: 0
    };
    if (this.tituloAccion === 'editar') {
      elemento.Numero_Solicitud = this.infoSolicitudgiro.numeroSolicitud;
      this.store.dispatch(actualizarAutorizacionGiro({id: this.activatedRoute.snapshot.url[1].path, element: elemento}));
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
}
