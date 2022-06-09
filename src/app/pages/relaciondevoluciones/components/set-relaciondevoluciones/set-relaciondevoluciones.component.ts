import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { getTiposID, getFormasPago, getBancos, getParametros, getRelacionDevolucionesById } from '../../../../shared/actions/shared.actions';
import { format_date, OPCIONES_AREA_FUNCIONAL } from '../../../../shared/interfaces/interfaces';
import { getAddSelected, selectBancos, selectFormasPago, selectParametros, selectRelacionDevolucionesById, selectTiposID } from '../../../../shared/selectors/shared.selectors';
import { cargarDatosRelacion, cargarInfoRelacionDevolcuines, cargarRelacionDevoluciones, getOrdenesDevolucion } from '../../actions/relaciondevoluciones.actions';
import { CONFIGURACION_CONSULTAOD } from '../../interfaces/interfaces';
import { selectOrdenesDevolucion } from '../../selectors/relaciondevoluciones.selectors';

@Component({
  selector: 'ngx-set-relaciondevoluciones',
  templateUrl: './set-relaciondevoluciones.component.html',
  styleUrls: ['./set-relaciondevoluciones.component.scss']
})
export class SetRelaciondevolucionesComponent implements OnInit, OnDestroy {

  relacionDevolucionesGroup: FormGroup;
  opcionesAreaFuncional: any;
  configuracionTabla: any;
  datosTabla: any;
  subOrdenesDevolucion$: any;
  ordenesDevolucion: any;
  subTiposDocumento$: any;
  tiposDocumento: any;
  subFormasPago$: any;
  formasPago: any;
  subBancos$: any;
  bancos: any;
  subTiposCuenta$: any;
  tiposCuenta: any;
  subscription: any;
  ordenesDevolucionSeleccionadas: any;
  total: number;
  tituloAccion: string;
  editable: boolean;
  subRelacionDevById$: any;
  relacionDevId: any;

  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private activatedRoute: ActivatedRoute,
    private _adapter: DateAdapter<any>,
    private translate: TranslateService
  ) {
    this._adapter.setLocale(format_date);
    this.editable = true;
    this.tituloAccion = this.activatedRoute.snapshot.url[0].path;
    this.opcionesAreaFuncional = OPCIONES_AREA_FUNCIONAL;
    this.configuracionTabla = Object.assign({}, CONFIGURACION_CONSULTAOD);
    this.datosTabla = [];
    this.ordenesDevolucionSeleccionadas = [];
    this.total = 0;
    this.store.dispatch(getOrdenesDevolucion({sortby: ['Consecutivo'], order: ['desc']}));
    this.store.dispatch(getTiposID());
    this.store.dispatch(getFormasPago({query: {TipoParametroId__CodigoAbreviacion: 'F_PAGO'}}));
    this.store.dispatch(getBancos({query: {TipoTerceroId__CodigoAbreviacion: 'BANCO'}}));
    this.store.dispatch(getParametros({query: {TipoParametroId__CodigoAbreviacion: 'CB'}}));
    if (this.mostrar(this.tituloAccion)) {
      this.store.dispatch(getRelacionDevolucionesById({id: this.activatedRoute.snapshot.url[1].path}));
      if (this.edit(this.tituloAccion)) {
        this.editable = false;
        this.configuracionTabla.checkElement.pipe.disabled = true;
      }
    }
    for (let i = 0; i < this.configuracionTabla.dataConfig.length; i++) {
      this.configuracionTabla.dataConfig[i].title.name = this.translate.instant('RELACION_DEVOLUCIONES.' + this.configuracionTabla.dataConfig[i].title.label_i18n);
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

  ngOnDestroy() {
    if (this.subFormasPago$) this.subFormasPago$.unsubscribe();
    if (this.subBancos$) this.subBancos$.unsubscribe();
    if (this.subTiposCuenta$) this.subTiposCuenta$.unsubscribe();
    if (this.subTiposDocumento$) this.subTiposDocumento$.unsubscribe();
    if (this.subRelacionDevById$) this.subRelacionDevById$.unsubscribe();
    if (this.subOrdenesDevolucion$) this.subOrdenesDevolucion$.unsubscribe();
  }

  ngOnInit() {
    this.createForm();
    this.subOrdenesDevolucion$ = this.store.select(selectOrdenesDevolucion).subscribe((accion: any) => {
      if (accion && accion.OrdenesDevolucion) {
        this.ordenesDevolucion = accion.OrdenesDevolucion;
        accion.OrdenesDevolucion = null;
        this.consultaFormasPago();
      }
    });

    this.subscription = this.store.select(getAddSelected).subscribe((accion) => {
      if (accion && accion.fila) {
        const aux = accion.fila;
        if (aux.selected === true) {
          this.ordenesDevolucionSeleccionadas.push(aux);
          this.total += aux.Valor;
        } else if (aux.selected === false) {
          this.ordenesDevolucionSeleccionadas.splice(this.ordenesDevolucionSeleccionadas.findIndex((element: any) => aux.Consecutivo === element.Consecutivo), 1);
          this.total -= aux.Valor;
        }
      }
    });

    this.subRelacionDevById$ = this.store.select(selectRelacionDevolucionesById).subscribe(action => {
      if (action && action.RelacionDevolucionesById) {
        this.relacionDevId = action.RelacionDevolucionesById;
      }
    });
  }

  saveForm(data: any) {
    if (this.ordenesDevolucionSeleccionadas.length > 0) {
      this.validator();
    }
    if ( this.relacionDevolucionesGroup.invalid ) {
      return Object.values( this.relacionDevolucionesGroup.controls ).forEach( control => {
        control.markAsTouched();
      });
    } else {
      this.store.dispatch(cargarInfoRelacionDevolcuines({InfoRelacionDevoluciones: data}));
      this.store.dispatch(cargarDatosRelacion({data: this.ordenesDevolucionSeleccionadas}));
    }
  }

  consultaFormasPago() {
    this.subFormasPago$ = this.store.select(selectFormasPago).subscribe(action => {
      if (action && action.FormasPago) {
        this.formasPago = action.FormasPago;
        action.FormasPago = null;
        this.consultaBancos();
      }
    });
  }

  consultaBancos() {
    this.subBancos$ = this.store.select(selectBancos).subscribe(action => {
      if (action && action.Bancos) {
        this.bancos = action.Bancos;
        action.Bancos = null;
        this.consultaTiposCuenta();
      }
    });
  }

  consultaTiposCuenta() {
    this.subTiposCuenta$ = this.store.select(selectParametros).subscribe(action => {
      if (action && action.Parametros) {
        this.tiposCuenta = action.Parametros;
        action.Parametros = null;
        this.consultaTiposDocumento();
      }
    });
  }

  consultaTiposDocumento() {
    this.subTiposDocumento$ = this.store.select(selectTiposID).subscribe(action => {
      if (action && action[0]) {
        this.tiposDocumento = action[0];
        this.relacionDevolucionesId();
      }
    });
  }

  buscarOrdenesDevolucion() {
    const aux = this.ordenesDevolucion.filter(
      m => new Date(m.FechaRequerimiento) >= new Date(this.relacionDevolucionesGroup.value.fechaInicio) &&
            new Date(m.FechaRequerimiento) <= new Date(this.relacionDevolucionesGroup.value.fechaFin)
    );
    aux.forEach(element => {
      const auxDatos = {
        Consecutivo: element.Consecutivo,
        Beneficiario: element.NombreBeneficiario,
        TipoDocumento: (this.tiposDocumento.find((e: any) => e.Id === element.TipoDocumentoBeneficiario)).Nombre,
        NumeroDocumento: element.NumeroDocumentoBeneficiario,
        FormaPago: (this.formasPago.find((e: any) => e.Id === element.FormaPago)).Nombre,
        Banco: (this.bancos.find((e: any) => e.Id === element.Banco)).TerceroId.NombreCompleto,
        TipoCuenta: (this.tiposCuenta.find((e: any) => e.Id === element.TipoCuenta)).Nombre,
        NumeroCuenta: element.NumeroCuenta,
        Valor: element.ValorDevolucion,
        selected: false
      };
      this.datosTabla.push(auxDatos);
    });
    if (this.mostrar(this.tituloAccion) && this.relacionDevolucionesGroup) {
      this.relacionDevId.OrdenesDevolucion.forEach(element => {
        const aux1 = (this.datosTabla).findIndex((e: any) => e.Consecutivo === element.Consecutivo);
        this.datosTabla[aux1].selected = true;
        this.total += this.datosTabla[aux1].Valor;
        this.ordenesDevolucionSeleccionadas.push(this.datosTabla[aux1]);
      });
    }
  }

  relacionDevolucionesId() {
    if (this.mostrar(this.tituloAccion) && this.relacionDevolucionesGroup) {
      this.relacionDevolucionesGroup.patchValue({
        areaFuncional: this.opcionesAreaFuncional.find((e: any) => e.Id === this.relacionDevId.AreaFuncional),
        fechaInicio: this.relacionDevId.FechaInicio,
        fechaFin: this.relacionDevId.FechaFin,
        consecutivo: this.relacionDevId.Consecutivo,
        estado: this.relacionDevId.Estado
      });
      this.buscarOrdenesDevolucion();
    }
  }

  createForm() {
    this.relacionDevolucionesGroup = this.fb.group({
      areaFuncional: ['', Validators.required],
      consecutivo: [''],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      estado: [''],
      validator: ['', Validators.required]
    });
  }

  get areaFuncionalInvalid() {
    return this.relacionDevolucionesGroup.get('areaFuncional').invalid && this.relacionDevolucionesGroup.get('areaFuncional').touched;
  }
  get fechaInicioInvalid() {
    return this.relacionDevolucionesGroup.get('fechaInicio').invalid && this.relacionDevolucionesGroup.get('fechaInicio').touched;
  }
  get fechaFinInvalid() {
    return this.relacionDevolucionesGroup.get('fechaFin').invalid && this.relacionDevolucionesGroup.get('fechaFin').touched;
  }

  private validator() {
    this.relacionDevolucionesGroup.patchValue({
      validator: 'a'
    });
  }
}
