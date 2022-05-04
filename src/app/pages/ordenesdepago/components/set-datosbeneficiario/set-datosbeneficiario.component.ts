import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { OPCIONES_AREA_FUNCIONAL } from '../../../../shared/interfaces/interfaces';
import { loadInfoDatosBeneficiario, loadRP } from '../../actions/ordenespago.actions';
import { DATOS_BENEFICIARIO } from '../../interfaces/interfaces';
import { seleccionarAreaFuncional } from '../../actions/ordenespago.actions';
import { CONFIGURACION_TABLA_ESTADOS, DATOS_ESTADOS } from '../../interfaces/interfaces';
import { getSolicitudGiroSeleccionada, selectBeneficiarioOP, selectOrdenesPagoById, selectRPBeneficiario, selectRPExpedido,
          selectSolicitudesGiroShared, selectVigenciasNoFuturas } from '../../../../shared/selectors/shared.selectors';
import { getBeneficiarioOP, getOrdenesPagoById, getRPBeneficiario, getRPExpedido, getSupervisor, getTiposID } from '../../../../shared/actions/shared.actions';
import { combineLatest } from 'rxjs';
import { getAreaFuncional } from '../../selectors/ordenespago.selectors';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-set-datosbeneficiario',
  templateUrl: './set-datosbeneficiario.component.html',
  styleUrls: ['./set-datosbeneficiario.component.scss']
})
export class SetDatosbeneficiarioComponent implements OnInit, OnDestroy {
  datosBeneficiario: FormGroup;
  opcionesAreaFuncional: Array<any>;
  datosAlmacenadosBeneficiarios: any;
  datosAlmacenadosBeneficiario: any;
  configTableEstados: any;
  datosTableEstados: any;
  susUnidadEjecutora$: any;
  solicitudGiroSeleccionada$: any;
  subscriptionCambios$: any;
  subscriptionfilter$: any;
  subRPBeneficiario$: any;
  subTiposId$: any;
  subVigencias$: any;
  vigencias: any;
  vigenciaActual: any;
  subBeneficiarioOP$: any;
  beneficiarioOP: any;
  subRPBeneficiarios$: any;
  rpBeneficiarios: any;
  subRPExpedido$: any;
  rpExpedidos: any;
  rps: any;
  tituloAccion: string;
  solicGiro;
  subOrdenesPago$: any;
  ordenPago: any;
  subSolicitudesGiro$: any;
  solicitudesGiro: any;
  editable: boolean;
  flagOP: boolean;
  rpBenef: boolean;

  constructor(private fb: FormBuilder,
    private store: Store<any>,
    private activatedRoute: ActivatedRoute,
    ) {
      this.editable = true;
      this.flagOP = true;
      this.rpBenef = true;
      this.solicGiro = '';
      this.datosAlmacenadosBeneficiarios = DATOS_BENEFICIARIO;
      this.tituloAccion = this.activatedRoute.snapshot.url[0].path;
      if (this.mostrar(this.tituloAccion)) {
        this.store.dispatch(getOrdenesPagoById({id: this.activatedRoute.snapshot.url[1].path}));
        if (this.edit(this.tituloAccion)) this.editable = false;
      }
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
    this.rps = [];
    this.handleVigencias();
    this.opcionesAreaFuncional = OPCIONES_AREA_FUNCIONAL;
    this.configTableEstados = CONFIGURACION_TABLA_ESTADOS;
    this.datosTableEstados = DATOS_ESTADOS;
    this.solicitudGiroSeleccionada$ = this.store.select(getSolicitudGiroSeleccionada).subscribe((solicitudGiro: any) => {
      if (solicitudGiro && this.datosBeneficiario) {
        this.datosBeneficiario.patchValue({
          solicitudGiro: solicitudGiro
        });
        this.solicGiro = solicitudGiro.NumeroSolicitud + ' - ' + solicitudGiro.NombreBeneficiario;
      }
    });

    this.subOrdenesPago$ = this.store.select(selectOrdenesPagoById).subscribe((action) => {
      if (this.flagOP && action && action.OrdenesPagoById) {
        this.ordenPago = action.OrdenesPagoById;
        this.ordenesPago();
      }
    });


    // Consulta cambios en los datos para enviar al store
    this.crearFormulario();
    this.handleFormChanges();
    this.subscriptionCambios$ = this.datosBeneficiario.valueChanges.subscribe((valor) => {
      if (this.datosBeneficiario.valid) {
        this.store.dispatch(loadInfoDatosBeneficiario({ InfoDatosBeneficiario: valor }));
      }
    });
    this.subBeneficiarioOP$ = this.store.select(selectBeneficiarioOP).subscribe((action) => {
      if (action && action.BeneficiarioOP) {
        this.beneficiarioOP = action.BeneficiarioOP[0];
        action.BeneficiarioOP = null;
        this.datosBeneficiario.patchValue({
          nombreBeneficiario: this.beneficiarioOP.NomProveedor,
          regimenBeneficiario: this.beneficiarioOP.Tipopersona,
          direccionBeneficiario: this.beneficiarioOP.Direccion,
          telefonoBeneficiario: this.beneficiarioOP.TelAsesor,
          banco: this.beneficiarioOP.IdEntidadBancaria,
          cuenta: this.beneficiarioOP.NumCuentaBancaria
        });
      }
    });

    if (this.tituloAccion === 'crear') this.getDatosID();
  }

  handleVigencias() {
    this.subVigencias$ = combineLatest([
      this.store.select(selectVigenciasNoFuturas),
      this.store.select(getAreaFuncional)
    ]).subscribe(([accVigencias, accAreaFuncional]) => {
      if (accVigencias && accVigencias[0] && accAreaFuncional && accAreaFuncional.areaFuncional) {
        const vigenciaActual = accVigencias[0].find(vigencia => vigencia.estado === 'Actual');
        if (vigenciaActual)
          this.vigenciaActual = vigenciaActual.valor;
        this.vigencias = accVigencias[0].filter(vigencia => vigencia.areaFuncional === String(accAreaFuncional.areaFuncional.Id));
        if (this.mostrar(this.tituloAccion) && this.ordenPago) {
          this.datosBeneficiario.patchValue({
            vigencia: this.vigencias.find((e: any) => String(e.valor) === String(this.ordenPago.Vigencia))
          });
        }
      }
    });

  }

  handleFormChanges() {
    this.datosBeneficiario.valueChanges.subscribe(
      (result: any) => {
        if (result.numeroId !== '') {
          this.datosAlmacenadosBeneficiarios.filter(
            (data: any) => {
              if (data.numeroId === result.numeroId) {
                this.datosAlmacenadosBeneficiario = data;
              } else {
                this.datosAlmacenadosBeneficiario = [];
              }
            });
        }
      }
    );
  }

  ngOnDestroy() {
    this.susUnidadEjecutora$.unsubscribe();
    this.subVigencias$.unsubscribe();
    this.subBeneficiarioOP$.unsubscribe();
    this.solicGiro = '';
    if (this.mostrar(this.tituloAccion)) {
      this.subOrdenesPago$.unsubscribe();
    }
    if (this.subSolicitudesGiro$) this.subSolicitudesGiro$.unsubscribe();
    if (this.solicitudGiroSeleccionada$) this.solicitudGiroSeleccionada$.unsubscribe();
    if (this.subRPExpedido$) this.subRPExpedido$.unsubscribe();
    if (this.subRPBeneficiarios$) this.subRPBeneficiarios$.unsubscribe();
  }

  crearFormulario() {
    this.datosBeneficiario = this.fb.group({
      consecutivo: ['', Validators.required],
      solicitudGiro: [''],
      areaFuncional: ['', Validators.required],
      numeroId: ['', Validators.required],
      banco: ['', Validators.required],
      cuenta: ['', Validators.required],
      nombreBeneficiario: ['', Validators.required],
      regimenBeneficiario: ['', Validators.required],
      direccionBeneficiario: ['', Validators.required],
      vigencia: ['', Validators.required],
      estado: ['']
    });
    this.susUnidadEjecutora$ = this.datosBeneficiario.get('areaFuncional').valueChanges.subscribe(valor => {
      this.store.dispatch(seleccionarAreaFuncional({ areaFuncional: valor }));
    });
  }

  esInvalido(nombre: string) {
    const input = this.datosBeneficiario.get(nombre);
    if (input)
      return input.invalid && (input.touched || input.dirty);
    else
      return true;
  }

  getDatosID() {
    this.subscriptionfilter$ = combineLatest([
      this.datosBeneficiario.get('numeroId').valueChanges,
    ]).subscribe(([numeroId]) => {
      if (numeroId) {
        this.store.dispatch(getBeneficiarioOP({query: {NumDocumento: numeroId}}));
      }
    });
    this.subRPBeneficiario$ = combineLatest([
      this.datosBeneficiario.get('numeroId').valueChanges,
      this.datosBeneficiario.get('vigencia').valueChanges,
    ]).subscribe(([numeroId, vigencia]) => {
      this.store.dispatch(getRPBeneficiario({query: {vigencia: '!$' + String(vigencia.valor), beneficiario: '!$' + numeroId}}));
      this.store.dispatch(getSupervisor({vigencia: String(vigencia.valor), documento: numeroId}));
      this.subRPBeneficiarios$ = this.store.select(selectRPBeneficiario).subscribe((action) => {
      if (action && action.RPBeneficiario && this.rpBenef) {
        this.rpBeneficiarios = action.RPBeneficiario;
        this.rpBenef = false;
        this.rpBeneficiarios.forEach(rpBeneficiario => {
          this.store.dispatch(getRPExpedido({vigencia: String(vigencia.valor), centroGestor: this.datosBeneficiario.value.areaFuncional.Id,
            query: {tipo: 'rp', 'data.solicitud_crp': rpBeneficiario._id}}));
          this.subRPExpedido$ = this.store.select(selectRPExpedido).subscribe((accion1) => {
            if (accion1 && accion1.RPExpedido) {
              this.rpExpedidos = accion1.RPExpedido;
              this.rps = [];
              const EstadosPermitidos: string[] = [
                'parcial_comprometido',
                'expedido',
              ];
              this.rpExpedidos.forEach(rp => {
                if (EstadosPermitidos.some(estado => estado === rp.Estado)) {
                  this.rps.push(rp);
                }
              });
              this.store.dispatch(loadRP({RP: this.rps}));
              accion1.RPExpedido = null;
            }
          });
        });
      }
    });
    });
  }

  ordenesPago() {
    if (this.mostrar(this.tituloAccion) && this.datosBeneficiario) {
      this.subSolicitudesGiro$ = this.store.select(selectSolicitudesGiroShared).subscribe((accion: any) => {
        if (accion && accion.SolicitudesGiroShared) {
          this.solicitudesGiro = accion.SolicitudesGiroShared;
          accion.SolicitudesGiroShared = null;
          const solGiro = this.solicitudesGiro.find((e: any) => String(e.Numero_Solicitud) === this.ordenPago.SolicitudGiro);
          solGiro.NumeroSolicitud = solGiro.Numero_Solicitud;
          this.datosBeneficiario.patchValue({
            solicitudGiro: solGiro
          });
          this.solicGiro = solGiro.Numero_Solicitud + ' - ' + solGiro.Nombre_Beneficiario;
        }
        this.datosBeneficiario.patchValue({
          areaFuncional: this.opcionesAreaFuncional.find((e: any) => e.Id === this.ordenPago.AreaFuncional),
          consecutivo: this.ordenPago.Consecutivo,
          numeroId: this.ordenPago.DocumentoBeneficiario,
          estado: this.ordenPago.Estado
        });
        this.getDatosID();
      });
    }
  }

  isInvalid(nombre: string) {
    const input = this.datosBeneficiario.get(nombre);
    if (input)
      return input.invalid && (input.touched || input.dirty);
    else
      return true;
  }

  validarFormulario(data: any ) {
    if (this.datosBeneficiario.invalid) {
      return Object.values(this.datosBeneficiario.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
}
