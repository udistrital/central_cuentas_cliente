import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { getConcepto, GetConceptosContables, getDatosID, getOrdenDevolucionById, getRazonesDevolucion, getTiposID } from '../../../../shared/actions/shared.actions';
import { OPCIONES_AREA_FUNCIONAL } from '../../../../shared/interfaces/interfaces';
import { getNodoSeleccionadoConcepto, seleccionarConcepto, selectDatosID, selectOrdenDEvolucionById, selectRazonesDevolucion, selectTiposID } from '../../../../shared/selectors/shared.selectors';
import { cargarDatosSolicitante } from '../../actions/ordenesdevolucion.actions';

@Component({
  selector: 'ngx-set-datossolicitante',
  templateUrl: './set-datossolicitante.component.html',
  styleUrls: ['./set-datossolicitante.component.scss']
})
export class SetDatossolicitanteComponent implements OnInit, OnDestroy {

  datosSolicitanteGroup: FormGroup;
  opcionesAreaFuncional: any;
  subTipoDocumento$: any;
  tiposDocumento: any;
  roles: any;
  subscriptionfilter$: any;
  subGetNodoSeleccionadoConcepto$: any;
  subConcepto$: any;
  concepto: any;
  subRazonesDevolucion$: any;
  razonesDevolucion: any;
  subDatosSolicitante$: any;
  datosSolicitante: any;
  tituloAccion: string;
  editable: boolean;
  subOrdenDevolucion$: any;
  ordenDevolucion: any;
  flagOD: boolean;

  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private activatedRoute: ActivatedRoute,
  ) {
    this.editable = true;
    this.flagOD = true;
    this.opcionesAreaFuncional = OPCIONES_AREA_FUNCIONAL;
    this.store.dispatch(getTiposID());
    this.store.dispatch(GetConceptosContables({}));
    this.store.dispatch(getRazonesDevolucion({query: {TipoParametroId__CodigoAbreviacion: 'R_DEV'}}));
    this.tituloAccion = this.activatedRoute.snapshot.url[0].path;
    if (this.mostrar(this.tituloAccion)) {
      this.store.dispatch(getOrdenDevolucionById({id: this.activatedRoute.snapshot.url[1].path}));
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
  ngOnDestroy(): void {
    this.subTipoDocumento$.unsubscribe();
    if (this.subDatosSolicitante$) this.subDatosSolicitante$.unsubscribe();
  }

  ngOnInit() {
    this.createForm();


    this.subscriptionfilter$ = combineLatest([
      this.datosSolicitanteGroup.get('tipoDocumento').valueChanges,
      this.datosSolicitanteGroup.get('numeroDocumento').valueChanges,
    ]).subscribe(([tipoId, numeroId]) => {
      if (numeroId && tipoId) {
        this.store.dispatch(getDatosID({ clave: 'solicitante1', numero: numeroId, tipo: tipoId.Id }));
      }
    });


    this.subDatosSolicitante$ = this.store.select(selectDatosID, 'solicitante1').subscribe(action1 => {
      if (action1 && action1.datosId[0].TerceroId) {
        this.datosSolicitante = action1.datosId[0];
        this.datosSolicitanteGroup.patchValue({
          nombre: this.datosSolicitante.TerceroId.NombreCompleto
        });
        action1.datosId = null;
      }
    });

    this.subOrdenDevolucion$ = this.store.select(selectOrdenDEvolucionById).subscribe((action) => {
      if (this.flagOD && action && action.OrdenDevolucionById) {
        this.ordenDevolucion = action.OrdenDevolucionById;
        this.flagOD = false;
        this.consultaTipoDocumentos();
      }
    });
  }

  saveForm(data: any) {
    if ( this.datosSolicitanteGroup.invalid ) {
      return Object.values( this.datosSolicitanteGroup.controls ).forEach( control => {
        control.markAsTouched();
      });
    } else {
      this.store.dispatch(cargarDatosSolicitante(data));
    }
  }

  agregarConcepto() {
    if (this.subGetNodoSeleccionadoConcepto$) this.subGetNodoSeleccionadoConcepto$.unsubscribe();
    this.subGetNodoSeleccionadoConcepto$ = this.store.select(getNodoSeleccionadoConcepto).subscribe((nodoConcepto) => {
      if (nodoConcepto && Object.keys(nodoConcepto)[0] !== 'type') {
        this.store.dispatch(getConcepto({codigo: nodoConcepto.Codigo}));
        if (this.subConcepto$) {
          this.subConcepto$.unsubscribe();
          this.concepto = null;
        }
        this.subConcepto$ = this.store.select(seleccionarConcepto).subscribe((concepto) => {
          if (concepto && concepto.Concepto) {
            this.concepto = concepto.Concepto;
            concepto.Concepto = null;
            this.datosSolicitanteGroup.patchValue({
              concepto: this.concepto
            });
          }
        });
      }
    });
  }

  ordenDevolucionId() {
    if (this.mostrar(this.tituloAccion) && this.datosSolicitanteGroup) {
      this.datosSolicitanteGroup.patchValue({
        areaFuncional: this.opcionesAreaFuncional.find((e: any) => e.Id === this.ordenDevolucion.AreaFuncional),
        tipoDocumento: this.tiposDocumento.find((e: any) => e.Id === this.ordenDevolucion.TipoDocumentoSolicitante),
        numeroDocumento: this.ordenDevolucion.NumeroDocumentoSolicitante,
        fechaRequerimiento: this.ordenDevolucion.FechaRequerimiento,
        nombre: this.ordenDevolucion.NombreSolicitante,
        cargo: this.ordenDevolucion.Cargo,
        numeroRequerimiento: this.ordenDevolucion.NumeroRequerimiento,
        razonDevolucion: this.razonesDevolucion.find((e: any) => e.Id === this.ordenDevolucion.RazonDevolucion),
        valorDevolucion: this.ordenDevolucion.ValorDevolucion
      });
      this.store.dispatch(getConcepto({codigo: this.ordenDevolucion.Concepto}));
      this.subConcepto$ = this.store.select(seleccionarConcepto).subscribe((concepto) => {
      if (concepto && concepto.Concepto) {
        this.concepto = concepto.Concepto;
        this.datosSolicitanteGroup.patchValue({
          concepto: concepto.Concepto
        });
        concepto.Concepto = null;
      }
    });
    }
  }

  consultaTipoDocumentos() {
    this.subTipoDocumento$ = this.store.select(selectTiposID).subscribe(action => {
      if (action) {
        this.tiposDocumento = action[0];
        this.consultaRazonesDevol();
      }
    });
  }

  consultaRazonesDevol() {
    this.subRazonesDevolucion$ = this.store.select(selectRazonesDevolucion).subscribe(action => {
      if (action && action.RazonesDevolucion) {
        this.razonesDevolucion = action.RazonesDevolucion;
        action.RazonesDevolucion = null;
        this.ordenDevolucionId();
      }
    });
  }

  createForm() {
    this.datosSolicitanteGroup = this.fb.group({
      areaFuncional: [''],
      tipoDocumento: [''],
      numeroDocumento: [''],
      nombre: [''],
      cargo: [''],
      numeroRequerimiento: [''],
      fechaRequerimiento: [''],
      concepto: [''],
      razonDevolucion: [''],
      valorDevolucion: [''],
    });
  }
}
