import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  CONFIGURACION_CONCEPTO_VALOR, DATOS_CONCEPTO_VALOR,
  CONFIGURACION_IMPUNTUACION, DATOS_IMPUNTUACION
} from '../../interfaces/interfaces';
import { Store } from '@ngrx/store';
import { getFilaSeleccionada, selectActividadNecesidad, selectInfoNecesidad, selectInfoRubro, selectMetaNecesidad, selectOrdenesPagoById,
          selectRPBeneficiario, selectRubrosCrp } from '../../../../shared/selectors/shared.selectors';
import { ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { getActividadesNecesidad, getInfoNecesidad, getInfoRubro, getMetaNecesidad, getRubrosCrp, LoadFilaSeleccionada } from '../../../../shared/actions/shared.actions';
import { cargarDatosImputacionPresupuestal } from '../../actions/ordenespago.actions';
import { OPCIONES_AREA_FUNCIONAL } from '../../../../shared/interfaces/interfaces';
import { getDatosBeneficiario, getDatosCompromiso, getInfoDatosBeneficiario, getRP } from '../../selectors/ordenespago.selectors';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-set-impuntuacionpresupuestal',
  templateUrl: './set-impuntuacionpresupuestal.component.html',
  styleUrls: ['./set-impuntuacionpresupuestal.component.scss']
})

export class SetImpuntuacionpresupuestalComponent implements OnInit, OnDestroy {
  @ViewChild('eliminarModal', { static: false }) eliminarModal: ElementRef;
  @ViewChild('fuentesFinanciamientoModal', { static: false }) fuentesFinanciamientoModal: ElementRef;
  impuntuacionPresupuestal: FormGroup;
  configTableHistorial: any;
  datosTableHistorial: any;
  configTableFuentes: any;
  datosTableFuentes: any;
  configTableImpuntuacion: any;
  datosTableImputacion: any;
  mostrarOcultar: string;
  mostrarOcultarIcono: string;
  subscription: any;
  opcionesAreaFuncional: any;
  subscriptionDatosRP$: any;
  subscriptionDatosCompromiso$: any;
  datosCompromiso: any;
  subscriptionDatosBeneficiario$: any;
  datosBeneficiario: any;
  subInfoRubro$: any;
  infoRubro: any;
  subInfoNecesidad$: any;
  infoNecesidad: any;
  subMetaNecesidad$: any;
  metaNecesidad: any;
  subActividadNecesidad$: any;
  actividadNecesidad: any;
  rps: any;
  cdp: any;
  nombre: any;
  rubrosCrp: any;
  tituloAccion: string;
  subOrdenesPago$: any;
  ordenPago: any;
  editable: boolean = true;
  valorValido: boolean = false;

  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute
    ) {
    this.configTableHistorial = CONFIGURACION_CONCEPTO_VALOR;
    this.datosTableHistorial = DATOS_CONCEPTO_VALOR;
    this.configTableFuentes = CONFIGURACION_CONCEPTO_VALOR;
    this.datosTableFuentes = DATOS_CONCEPTO_VALOR;
    this.configTableImpuntuacion = CONFIGURACION_IMPUNTUACION;
    this.cdp = '';
    this.datosTableImputacion = [];
    this.mostrarOcultar = 'Mostrar';
    this.mostrarOcultarIcono = 'fa-eye';
    this.tituloAccion = this.activatedRoute.snapshot.url[0].path;
    if (this.tituloAccion === 'ver') {
      this.editable = false;
      this.valorValido = true;
    }
  }

  ngOnInit() {
    this.opcionesAreaFuncional = OPCIONES_AREA_FUNCIONAL;
    this.impuntuacionPresupuestal = this.fb.group({
      disponibilidad: [''],
      crp: [''],
      valor: [''],
      codigo: [''],
      nombre: [''],
    });
    this.mostrarOcultarHistoria('');
    this.subscription = this.store.select(getFilaSeleccionada).subscribe((accion) => {
      if (accion && accion.accion && accion.accion.idStep === 3) {
        if (accion.accion.name === 'modificar') {
          this.modalEliminar(accion.fila);
        } else if (accion.accion.name === 'ver') {
          this.modalFinanciamiento(accion.fila);
        }
      }
    });
    this.subscriptionDatosRP$ = this.store.select(getRP).subscribe((action) => {
      if (action && action.RP) {
        this.rps = action.RP;
      }
    });
    this.subscriptionDatosCompromiso$ = this.store.select(getDatosCompromiso).subscribe((action) => {
      if (action && action.DatosCompromiso) {
        this.datosCompromiso = action.DatosCompromiso;
      }
    });

    this.subscriptionDatosBeneficiario$ = this.store.select(getInfoDatosBeneficiario).subscribe((action) => {
      if (action && action.InfoDatosBeneficiario) {
        this.datosBeneficiario = action.InfoDatosBeneficiario;
      }
    });

    this.subOrdenesPago$ = this.store.select(selectOrdenesPagoById).subscribe((action) => {
      if (action && action.OrdenesPagoById) {
        this.ordenPago = action.OrdenesPagoById;
        this.ordenesPago();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(LoadFilaSeleccionada(null));
  }

  modalFinanciamiento(fila: any) {
    this.store.dispatch(getInfoNecesidad({cdp: this.cdp}));
    this.subInfoNecesidad$ = this.store.select(selectInfoNecesidad).subscribe((action) => {
      if (action && action.InfoNecesidad) {
        this.infoNecesidad = action.InfoNecesidad;
        action.InfoNecesidad = null;
        this.store.dispatch(getMetaNecesidad({meta: this.infoNecesidad.Rubros[0].Metas[0].MetaId}));
        this.subMetaNecesidad$ = this.store.select(selectMetaNecesidad).subscribe((action1) => {
          if (action1 && action1.MetaNecesidad) {
            this.metaNecesidad = action1.MetaNecesidad;
            this.datosTableFuentes[0].metas = this.infoNecesidad.Rubros[0].Metas[0].MetaId + ' - ' + this.metaNecesidad.Nombre;
            this.datosTableFuentes[0].rubroGasto = this.infoNecesidad.Rubros[0].Productos[0].InfoProducto;
            action1.MetaNecesidad = null;
          }
        });
        this.store.dispatch(getActividadesNecesidad({actividad: this.infoNecesidad.Rubros[0].Metas[0].Actividades[0].ActividadId}));
        this.subActividadNecesidad$ = this.store.select(selectActividadNecesidad).subscribe((action1) => {
          if (action1 && action1.ActividadNecesidad) {
            this.actividadNecesidad = action1.ActividadNecesidad;
            action1.ActividadNecesidad = null;
            this.datosTableFuentes[0].actividades = String(this.actividadNecesidad.Id) + ' - ' + this.actividadNecesidad.Nombre;
          }
        });
        this.datosTableFuentes[0].codigoRubro = fila.Codigo;
        this.datosTableFuentes[0].fuenteFinanciamiento = this.infoNecesidad.Rubros[0].Metas[0].Actividades[0].FuentesActividad[0].InfoFuente.Codigo + ' - ' +
                                                          this.infoNecesidad.Rubros[0].Metas[0].Actividades[0].FuentesActividad[0].InfoFuente.Descripcion;
        this.datosTableFuentes[0].valor = fila.Valor;
      }
      this.modalService.open(this.fuentesFinanciamientoModal);
    });
  }

  modalEliminar(fila: any) {
    this.modalService.open(this.eliminarModal).result.then((result) => {
      if (`${result}`) {
        this.datosTableImputacion.splice(this.datosTableImputacion.findIndex(
          (element: any) => element.codigo === fila.codigo
            && element.disponibilidad === fila.disponibilidad
            && element.registro === fila.registro
            && element.valor === fila.valor
        ), 1);
      }
    });
  }

  mostrarOcultarHistoria(state: string) {
    if (state === 'false') {
      this.mostrarOcultar = 'Ocultar';
      this.mostrarOcultarIcono = 'fa-eye-slash';
    } else {
      this.mostrarOcultar = 'Mostrar';
      this.mostrarOcultarIcono = 'fa-eye';
    }
  }

  isInvalid(nombre: string) {
    const input = this.impuntuacionPresupuestal.get(nombre);
    if (input)
      return input.invalid && (input.touched || input.dirty);
    else
      return true;
  }

  agregar() {
    let valor;
    if (this.impuntuacionPresupuestal.value.valor > 0) valor = this.impuntuacionPresupuestal.value.valor;
    else valor = 0;
    const datosAgregar = [
      {
        Disponibilidad: String(this.impuntuacionPresupuestal.value.disponibilidad),
        Codigo: this.impuntuacionPresupuestal.value.codigo.FatherInfo._id,
        Registro: this.impuntuacionPresupuestal.value.crp.Consecutivo,
        Nombre: this.nombre,
        Valor: valor
      }
    ];
    this.datosTableImputacion.push(datosAgregar[0]);
    if (this.totalGasto() > this.impuntuacionPresupuestal.value.crp.ValorActual) this.valorValido = false;
    else this.valorValido = true;
  }

  totalGasto() {
    return this.datosTableImputacion.reduce((a: any, b: { Valor: number; }) => a + b.Valor, 0);
  }

  fijarCdp() {
    this.store.select(selectRPBeneficiario).subscribe((action) => {
      if (action && action.RPBeneficiario) {
        this.cdp = action.RPBeneficiario[action.RPBeneficiario.findIndex((e: any) => e._id === this.impuntuacionPresupuestal.get('crp').value.Data.solicitud_crp)];
        this.impuntuacionPresupuestal.patchValue({
          disponibilidad: this.cdp.consecutivoCdp
        });
      }
      this.store.dispatch(getRubrosCrp({vigencia: this.datosBeneficiario.vigencia.valor, centroGestor: this.datosBeneficiario.vigencia.areaFuncional,
        crp: this.impuntuacionPresupuestal.get('crp').value._id}));
      this.store.select(selectRubrosCrp).subscribe((action1) => {
        if (action1 && action1.RubrosCrp) {
          this.rubrosCrp = action1.RubrosCrp;
          action1.RubrosCrp = null;
        }
      });
    });
  }

  nombreRubro() {
    this.store.dispatch(getInfoRubro({rubro: this.impuntuacionPresupuestal.value.codigo.FatherInfo._id}));
    this.subInfoRubro$ = this.store.select(selectInfoRubro).subscribe((action) => {
      if (action && action.InfoRubro) {
        this.infoRubro = action.InfoRubro[0];
        this.nombre = this.infoRubro.data.Nombre;
      }
    });
  }

  cargarImputacion() {
    this.store.dispatch(cargarDatosImputacionPresupuestal({data: this.datosTableImputacion}));
  }

  ordenesPago() {
    this.datosTableImputacion = this.ordenPago.ImputacionPresupuestal;
  }
}
