import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getConvenios, getEntradaAlmacen, getTiposCompromisos, getTiposOrdenesPago, getVigencias } from '../../../../shared/actions/shared.actions';
import { selectConvenios, selectEntradaAlmacen, selectOrdenesPagoById, selectSupervisor, selectTiposCompromisos, selectTiposOrdenesPago } from '../../../../shared/selectors/shared.selectors';
import { getInfoDatosBeneficiario } from '../../selectors/ordenespago.selectors';
import { cargarDatosCompromiso } from '../../actions/ordenespago.actions';
import { DATOS_COMPROMISO, DATOS_TIPO_CONVENIO } from '../../interfaces/interfaces';
import { OPCIONES_AREA_FUNCIONAL } from '../../../../shared/interfaces/interfaces';
import { map, startWith } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-set-datoscompromiso',
  templateUrl: './set-datoscompromiso.component.html',
  styleUrls: ['./set-datoscompromiso.component.scss']
})
export class SetDatoscompromisoComponent implements OnInit, OnDestroy {
  datosCompromiso: FormGroup;
  datosAlmacenadosCompromisos: any;
  datosAlmacenadosCompromiso: any;
  susVigencias$: any;
  vigencias: any;
  vigenciaActual: number;
  opcionesAreaFuncional: any;
  subTiposCompromisos$: any;
  tiposCompromisos: any;
  subscriptionDatosBeneficiario$: any;
  subInterventores$: any;
  interventores: any;
  subTiposOrdenesPago$: any;
  tiposOrdenesPago: any;
  subRPExpedido$: any;
  rpExpedidos: any;
  subRPParcialComprometido$: any;
  rpParcialComprometido: any;
  subRPBeneficiarios$: any;
  rpBeneficiarios: any;
  subActaRecibido$: any;
  datosBeneficiario: any;
  subSupervisor$: any;
  supervisor: any;
  tiposConvenio: any;
  convenios: any;
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  conv: any;
  subscriptionCambios$: any;
  subEntradaAlmacen$: any;
  tituloAccion: any;
  subOrdenesPago$: any;
  ordenPago: any;
  convenio: boolean;
  subSolicitudesGiro$;
  subConvenio$: any;
  editable: boolean;
  flagActa: boolean;
  flagRubro: boolean;

  constructor(private fb: FormBuilder,
    private store: Store<any>,
    private activatedRoute: ActivatedRoute,
    ) {
      this.datosBeneficiario = null;
      this.editable = true;
      this.convenio = true;
      this.flagActa = true;
      this.flagRubro = true;
      this.store.dispatch(getVigencias());
      this.datosAlmacenadosCompromisos = DATOS_COMPROMISO;
      this.datosAlmacenadosCompromiso = [];
      this.store.dispatch(getTiposCompromisos({query: {TipoParametroId__CodigoAbreviacion: 'TCP'}}));
      this.store.dispatch(getTiposOrdenesPago({query: {TipoParametroId__CodigoAbreviacion: 'TOP'}}));
      this.tituloAccion = this.activatedRoute.snapshot.url[0].path;
      if (this.edit(this.tituloAccion)) this.editable = false;
    }

  ngOnInit() {
    this.tiposConvenio = DATOS_TIPO_CONVENIO;
    this.opcionesAreaFuncional = OPCIONES_AREA_FUNCIONAL;
    this.crearFormulario();
    this.handleFormChanges();
    this.subTiposCompromisos$ = this.store.select(selectTiposCompromisos).subscribe((action) => {
      if (action && action.TiposCompromisos) {
        this.tiposCompromisos = action.TiposCompromisos;
        if (this.mostrar(this.tituloAccion) && this.ordenPago) {
          this.datosCompromiso.patchValue({
            compromiso: this.tiposCompromisos.find((e: any) => e.Id === this.ordenPago.Compromiso)
          });
        }
      }
    });
    this.subscriptionDatosBeneficiario$ = this.store.select(getInfoDatosBeneficiario).subscribe((action) => {
      if (action && action.InfoDatosBeneficiario) {
        this.datosBeneficiario = action.InfoDatosBeneficiario;
        if (this.datosBeneficiario && this.datosBeneficiario.areaFuncional.Id === 2) this.convenio = true;
        else this.convenio = false;
      }
    });
    this.subTiposOrdenesPago$ = this.store.select(selectTiposOrdenesPago).subscribe((action) => {
      if (action && action.TiposOrdenesPago) {
        this.tiposOrdenesPago = action.TiposOrdenesPago;
        if (this.mostrar(this.tituloAccion) && this.ordenPago) {
          this.datosCompromiso.patchValue({
            tipoOrdenPago: this.tiposOrdenesPago.find((e: any) => e.Id === this.ordenPago.TipoOrdenPago)
          });
        }
      }
    });
    this.subscriptionCambios$ = this.datosCompromiso.valueChanges.subscribe((valor) => {
      if (this.datosCompromiso.valid)
        this.store.dispatch(cargarDatosCompromiso({ DatosCompromiso: valor }));
    });


    this.subSupervisor$ = this.store.select(selectSupervisor).subscribe((action) => {
      if (action && action.Supervisor.informacion_persona.nombre_completo) {
        this.supervisor = action.Supervisor;
        this.datosCompromiso.patchValue({
          supervisor: this.supervisor.informacion_persona.supervisor.nombre,
          numeroCompromiso: this.supervisor.informacion_persona.contrato.numero
        });
      }
    });

    this.datosCompromiso.get('actaRecibido').valueChanges.subscribe(valor => {
      if (this.flagActa) {
        this.store.dispatch(getEntradaAlmacen({query: {EstadoMovimientoId__Nombre__startswith: 'Entrada',
        Detalle__json_contains: `{"acta_recibido_id":${valor}}`}}));
      }
      this.subEntradaAlmacen$ = this.store.select(selectEntradaAlmacen).subscribe((action) => {
        if (action && action.EntradaAlmacen && action.EntradaAlmacen.length) {
          const json = JSON.parse(action.EntradaAlmacen[0].Detalle);
          action.EntradaAlmacen = null;
          this.datosCompromiso.patchValue({
            entradaAlmacen: json.consecutivo
          });
        }
      });
    });

    this.subOrdenesPago$ = this.store.select(selectOrdenesPagoById).subscribe((action) => {
      if (action && action.OrdenesPagoById) {
        this.ordenPago = action.OrdenesPagoById;
        this.ordenesPago();
      }
    });
  }

  private mostrar(action: string): boolean {
    const ACCIONES: string[] = ['ver', 'editar', 'revisar'];
    return ACCIONES.some(acc => acc === action);
  }

  private edit(action: string): boolean {
    const ACCIONES_EDICION: string[] = ['ver', 'revisar'];
    return ACCIONES_EDICION.some(acc => acc === action);
  }

  handleFormChanges() {
    this.datosCompromiso.valueChanges.subscribe(
      (result: any) => {
        if (result.numeroCompromiso !== '') {
          this.datosAlmacenadosCompromisos.filter(
            (data: any) => {
              if (data.numeroCompromiso === result.numeroCompromiso) {
                this.datosAlmacenadosCompromiso = data;
              } else {
                this.datosAlmacenadosCompromiso = [];
              }
            });
        }
      }
    );
    }

  ngOnDestroy() {
    this.subTiposCompromisos$.unsubscribe();
    if (this.subEntradaAlmacen$) this.subEntradaAlmacen$.unsubscribe();
    this.subSupervisor$.unsubscribe();
    if (this.subConvenio$) this.subConvenio$.unsubscribe();
    this.subOrdenesPago$.unsubscribe();
  }

  validatorConvenio(): ValidatorFn {
    if (this.datosBeneficiario && this.datosBeneficiario.areaFuncional.Id !== 2) return Validators.nullValidator;
    else return Validators.required;
  }

  crearFormulario() {
    this.datosCompromiso = this.fb.group({
      compromiso: ['', Validators.required],
      tipoConvenio: [''],
      convenio: [''],
      supervisor: [''],
      tipoOrdenPago: ['', Validators.required],
      numeroCompromiso: [''],
      actaRecibido: ['', Validators.required],
      entradaAlmacen: [''],
      detalle: [''],
      conv: [''],
    });
  }

  get vigenciaSeleccionada() {
    return this.datosCompromiso.get('vigencia').value;
  }

  consultarConvenios() {
    this.convenios = [];
    let codigoRubro = '';
    if (String(this.datosCompromiso.get('tipoConvenio').value.tipo_convenio) === 'CONVENIOS') codigoRubro = '3-00-991-00-00-01';
    else codigoRubro = '3-00-991-00-00-29';
    if (this.flagRubro) {
      this.store.dispatch(getConvenios({codigo: codigoRubro}));
    }
    this.subConvenio$ = this.store.select(selectConvenios).subscribe((action) => {
      if (action && action.Convenios) {
        this.convenios = action.Convenios[0].children;
        action.Convenios = null;
        this.flagRubro = false;
        if (this.mostrar(this.tituloAccion)) {
          this.datosCompromiso.patchValue({
            convenio: (this.convenios.find((e: any) => e.Codigo === this.ordenPago.Convenio).data.Nombre)
          });
        }
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value, this.convenios)),
        );
        action.Convenios = null;
      }
    });
  }

  private _filter(value: any, convenios: any): any[] {
    const filterValue = value;
    let filtro;
    try {
      filtro = convenios.filter(convenio => (convenio.data.Nombre).toUpperCase().includes(filterValue.toUpperCase()));
    } catch (error) {
      this.conv = value;
      this.datosCompromiso.patchValue({
        convenio: value.data.Nombre,
        conv: value
      });
    }
    return filtro;
  }

  validarFormulario(data: any) {
    if (this.datosCompromiso.invalid) {
      return Object.values(this.datosCompromiso.controls).forEach(control => {
        control.markAsDirty();
      });
    }
  }

  ordenesPago() {
    if (this.mostrar(this.tituloAccion)) {
      this.datosCompromiso.patchValue({
        numeroCompromiso: this.ordenPago.NumeroCompromiso,
        tipoConvenio: this.tiposConvenio.find((e: any) => e.tipo_convenio === this.ordenPago.TipoConvenio),
        actaRecibido: this.ordenPago.ActaRecibido,
        detalle: this.ordenPago.Detalle,
      });
      this.consultarConvenios();
    }
  }

  get compromisoInvalid() {
    return this.datosCompromiso.get('compromiso').invalid && this.datosCompromiso.get('compromiso').touched;
  }
  get numeroCompromisoInvalid() {
    return this.datosCompromiso.get('numeroCompromiso').invalid && this.datosCompromiso.get('numeroCompromiso').touched;
  }
  get tipoConvenioInvalid() {
    return this.datosCompromiso.get('tipoConvenio').invalid && this.datosCompromiso.get('tipoConvenio').touched;
  }
  get convenioInvalid() {
    return this.datosCompromiso.get('convenio').invalid && this.datosCompromiso.get('convenio').touched;
  }
  get actaRecibidoInvalid() {
    return this.datosCompromiso.get('actaRecibido').invalid && this.datosCompromiso.get('actaRecibido').touched;
  }
  get tipoOrdenPagoInvalid() {
    return this.datosCompromiso.get('tipoOrdenPago').invalid && this.datosCompromiso.get('tipoOrdenPago').touched;
  }
}
