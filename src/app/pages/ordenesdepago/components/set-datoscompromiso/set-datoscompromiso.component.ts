import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { getConvenios, getEntradaAlmacen, getTiposCompromisos, getTiposOrdenesPago, getVigencias } from '../../../../shared/actions/shared.actions';
import { selectConvenios, selectEntradaAlmacen, selectOrdenesPagoById, selectSupervisor, selectTiposCompromisos, selectTiposOrdenesPago } from '../../../../shared/selectors/shared.selectors';
import { getAreaFuncional, getInfoDatosBeneficiario } from '../../selectors/ordenespago.selectors';
import { cargarDatosCompromiso, cargarDatosAlmacenadosCompromiso, loadRP } from '../../actions/ordenespago.actions';
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
  entradaAlmacen: any;
  tituloAccion: any;
  subOrdenesPago$: any;
  ordenPago: any;
  subSolicitudesGiro$;
  editable: boolean = true;

  constructor(private fb: FormBuilder,
    private store: Store<any>,
    private activatedRoute: ActivatedRoute,
    ) {
      this.store.dispatch(getVigencias());
      this.datosAlmacenadosCompromisos = DATOS_COMPROMISO;
      this.datosAlmacenadosCompromiso = [];
      this.store.dispatch(getTiposCompromisos({query: {TipoParametroId__Id: 16}}));
      this.store.dispatch(getTiposOrdenesPago({query: {TipoParametroId__Id: 53}}));
      this.tituloAccion = this.activatedRoute.snapshot.url[0].path;
      if (this.tituloAccion === 'ver') this.editable = false;
    }

  ngOnInit() {
    this.entradaAlmacen = '';
    this.tiposConvenio = DATOS_TIPO_CONVENIO;
    this.opcionesAreaFuncional = OPCIONES_AREA_FUNCIONAL;
    this.crearFormulario();
    this.handleFormChanges();
    this.subTiposCompromisos$ = this.store.select(selectTiposCompromisos).subscribe((action) => {
      if (action && action.TiposCompromisos) {
        this.tiposCompromisos = action.TiposCompromisos;
        if (this.tituloAccion === 'ver') {
          this.datosCompromiso.patchValue({
            compromiso: this.tiposCompromisos[this.tiposCompromisos.findIndex((e: any) => e.Id === this.ordenPago.Compromiso)]
          });
        }
      }
    });
    this.subscriptionDatosBeneficiario$ = this.store.select(getInfoDatosBeneficiario).subscribe((action) => {
      if (action && action.InfoDatosBeneficiario) {
        this.datosBeneficiario = action.InfoDatosBeneficiario;
      }
    });
    this.subTiposOrdenesPago$ = this.store.select(selectTiposOrdenesPago).subscribe((action) => {
      if (action && action.TiposOrdenesPago) {
        this.tiposOrdenesPago = action.TiposOrdenesPago;
        if (this.tituloAccion === 'ver') {
          this.datosCompromiso.patchValue({
            tipoOrdenPago: this.tiposOrdenesPago[this.tiposOrdenesPago.findIndex((e: any) => e.Id === this.ordenPago.TipoOrdenPago)]
          });
        }
      }
    });
    this.subscriptionCambios$ = this.datosCompromiso.valueChanges.subscribe((valor) => {
      if (this.datosCompromiso.valid)
        this.store.dispatch(cargarDatosCompromiso({ DatosCompromiso: valor }));
    });


    this.subSupervisor$ = this.store.select(selectSupervisor).subscribe((action) => {
      if (action && action.Supervisor) {
        this.supervisor = action.Supervisor;
        action.Supervisor = null;
        this.datosCompromiso.patchValue({
          supervisor: this.supervisor.informacion_persona.supervisor.nombre
        });
      }
    });

    this.datosCompromiso.get('actaRecibido').valueChanges.subscribe(valor => {
      this.store.dispatch(getEntradaAlmacen({query: {EstadoMovimientoId__Nombre__startswith: 'Entrada', Detalle__json_contains: `{"acta_recibido_id":${valor}}`}}));
      this.subEntradaAlmacen$ = this.store.select(selectEntradaAlmacen).subscribe((action) => {
        if (action && action.EntradaAlmacen[0]) {
          const json = JSON.parse(action.EntradaAlmacen[0].Detalle);
          this.entradaAlmacen = json.consecutivo;
          this.datosCompromiso.patchValue({
            entradaAlmacen: json
          });
          action.EntradaAlmacen = null;
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
  }

  crearFormulario() {
    this.datosCompromiso = this.fb.group({
      compromiso: [''],
      tipoConvenio: [''],
      convenio: [''],
      supervisor: [''],
      tipoOrdenPago: [''],
      numeroCompromiso: [''],
      actaRecibido: [''],
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
    this.store.dispatch(getConvenios({codigo: codigoRubro}));
    this.store.select(selectConvenios).subscribe((action) => {
      if (action && action.Convenios) {
        this.convenios = action.Convenios[0].children;
        if (this.tituloAccion === 'ver') {
          this.datosCompromiso.patchValue({
            convenio: (this.convenios[this.convenios.findIndex((e: any) => e.Codigo === this.ordenPago.Convenio)]).data.Nombre
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

  esInvalido(nombre: string) {
    const input = this.datosCompromiso.get(nombre);
    if (input)
      return input.invalid && (input.touched || input.dirty);
    else
      return true;
  }

  isInvalid(nombre: string) {
    const input = this.datosCompromiso.get(nombre);
    if (input)
      return input.invalid && (input.touched || input.dirty);
    else
      return true;
  }

  validarFormulario(data: any) {
    if (this.datosCompromiso.invalid) {
      return Object.values(this.datosCompromiso.controls).forEach(control => {
        control.markAsDirty();
      });
    }
  }

  ordenesPago() {
    if (this.tituloAccion === 'ver') {
      this.datosCompromiso.patchValue({
        numeroCompromiso: this.ordenPago.NumeroCompromiso,
        tipoConvenio: this.tiposConvenio[this.tiposConvenio.findIndex((e: any) => e.tipo_convenio === this.ordenPago.TipoConvenio)],
        actaRecibido: this.ordenPago.ActaRecibido,
        detalle: this.ordenPago.Detalle,
      });
      this.consultarConvenios();
    }
  }
}
