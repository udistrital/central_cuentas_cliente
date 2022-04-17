import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { OPCIONES_AREA_FUNCIONAL } from '../../../../shared/interfaces/interfaces';
import { loadInfoDatosBeneficiario, loadRP } from '../../actions/ordenespago.actions';
import { DATOS_BENEFICIARIO } from '../../interfaces/interfaces';
import { seleccionarAreaFuncional } from '../../actions/ordenespago.actions';
import { CONFIGURACION_TABLA_ESTADOS, DATOS_ESTADOS } from '../../interfaces/interfaces';
import { getSolicitudGiroSeleccionada, selectBeneficiarioOP, selectDatosID, selectRPBeneficiario, selectRPExpedido, selectTiposID, selectVigenciasNoFuturas } from '../../../../shared/selectors/shared.selectors';
import { getBeneficiarioOP, getRPBeneficiario, getRPExpedido, getSupervisor, getTiposID } from '../../../../shared/actions/shared.actions';
import { combineLatest } from 'rxjs';
import { getAreaFuncional } from '../../selectors/ordenespago.selectors';

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
  tiposId: any;
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
  solicGiro = '';

  constructor(private fb: FormBuilder,
    private store: Store<any>,
    ) {
      this.datosAlmacenadosBeneficiarios = DATOS_BENEFICIARIO;
      this.store.dispatch(getTiposID());
      this.rps = [];
     }

  ngOnInit() {
    this.handleVigencias();
    this.opcionesAreaFuncional = OPCIONES_AREA_FUNCIONAL;
    this.configTableEstados = CONFIGURACION_TABLA_ESTADOS;
    this.datosTableEstados = DATOS_ESTADOS;
    this.solicitudGiroSeleccionada$ = this.store.select(getSolicitudGiroSeleccionada).subscribe((solicitudGiro: any) => {
      if (solicitudGiro) {
        this.datosBeneficiario.patchValue({
          solicitudGiro: solicitudGiro
        });
        this.solicGiro = solicitudGiro.NumeroSolicitud + ' - ' + solicitudGiro.NombreBeneficiario;
      }
    });
    this.subTiposId$ = this.store.select(selectTiposID).subscribe((action) => {
      if (action) {
        this.tiposId = action[0];
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
    this.getDatosID();
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
        this.vigencias = accVigencias[0]
          .filter(vigencia => vigencia.areaFuncional === String(accAreaFuncional.areaFuncional.Id));
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
  }

  crearFormulario() {
    this.datosBeneficiario = this.fb.group({
      consecutivo: [''],
      solicitudGiro: [''],
      areaFuncional: ['', Validators.required],
      tipoId: [''],
      numeroId: [''],
      banco: [''],
      cuenta: [''],
      nombreBeneficiario: [''],
      regimenBeneficiario: [''],
      direccionBeneficiario: [''],
      telefonoBeneficiario: [''],
      vigencia: ['']
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
      this.datosBeneficiario.get('tipoId').valueChanges,
    ]).subscribe(([numeroId, tipoId]) => {
      if (numeroId && tipoId) {
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
      if (action && action.RPBeneficiario) {
        this.rpBeneficiarios = action.RPBeneficiario;
        this.rpBeneficiarios.forEach(rpBeneficiario => {
          this.store.dispatch(getRPExpedido({vigencia: String(vigencia.valor), centroGestor: this.datosBeneficiario.value.areaFuncional.Id,
            query: {tipo: 'rp', 'data.solicitud_crp': rpBeneficiario._id}}));
          this.subRPExpedido$ = this.store.select(selectRPExpedido).subscribe((accion1) => {
            if (accion1 && accion1.RPExpedido) {
              this.rpExpedidos = accion1.RPExpedido;
              this.rps = [];
              accion1.RPExpedido.forEach(rp => {
                if (rp.Estado === 'parcial_comprometido' || rp.Estado === 'expedido') {
                  this.rps.push(rp);
                }
              });
              accion1.RPExpedido = null;
            }
          });
        });
      }
    });
    });
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
    } else {
      this.store.dispatch(loadRP({RP: this.rps}));
    }
  }
}
