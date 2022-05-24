import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as SharedActions from '../actions/shared.actions';
import { SharedService } from '../services/shared.service';
import { Store } from '@ngrx/store';
import { selectConceptos, selectDatosID, selectTiposID } from '../selectors/shared.selectors';
import { selectVigencias } from '../selectors/shared.selectors';
import { PopUpManager } from '../../@core/managers/popUpManager';
import { TranslateService } from '@ngx-translate/core';


@Injectable()
export class SharedEffects {

  constructor(
    private actions$: Actions,
    private sharedService: SharedService,
    private store: Store<any>,
    private popupManager: PopUpManager,
    private translate: TranslateService
  ) { }


  loadShareds$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(SharedActions.loadShareds),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY)
    );
  });

  GetArbolRubro$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.GetArbolRubro),
      mergeMap((branch) =>
        this.sharedService.getArbol(branch.branch)
          .pipe(
            map(data => SharedActions.LoadArbolRubro(data)),
            catchError(data => of(SharedActions.CatchError(data))))
      )
    );
  });

  GetConceptosContables$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.GetConceptosContables),
      mergeMap((id) => {
        return this.sharedService.getConceptos(id ? id.id : id)
        .pipe(map(data => SharedActions.LoadConceptosContables(
          {ConceptosContables: data})),
          catchError(data => of(SharedActions.CatchError(data))));
      })
    );
  });

  GetConcepto$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.getConcepto),
      mergeMap((id) => {
        return this.sharedService.getConceptos(id.codigo)
        .pipe(map(data => SharedActions.cargarConcepto(
          {Concepto: data})),
          catchError(data => of(SharedActions.CatchError(data))));
      })
    );
  });

  getTiposID$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.getTiposID),
      withLatestFrom(this.store.select(selectTiposID)),
      mergeMap((action) => {
        if (!action || !action[1])
          return this.sharedService.getTiposID(true)
            .pipe(
              map(data => SharedActions.loadTiposID([data])),
              catchError(data => of(SharedActions.CatchError(data))));
        else
          return of(SharedActions.loadTiposID(action[1]));
      }
      )
    );
  });

  getDatosID$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.getDatosID),
      mergeMap((params) =>
        this.sharedService.getDatosID(params.numero, params.tipo, params.limit, params.fields)
          .pipe(
            map((data: any[]) => {
              return SharedActions.loadDatosID({ clave: params.clave, datosId: data });
            }),
            catchError(data => of(SharedActions.CatchError(data))))
      ) );
    });

  getVigencias$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.getVigencias),
      withLatestFrom(this.store.select(selectVigencias)),
      mergeMap((accion) => {
        if (!accion || !accion[1])
          return this.sharedService.getVigencias()
            .pipe(map(data => SharedActions.loadVigencias([data])),
              catchError(data => of(SharedActions.CatchError(data))));
        else
          return of(SharedActions.loadVigencias(accion[1]));
      })
    );
  });

  getConceptos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.getConceptos),
      mergeMap((accion) => this.sharedService.getConceptosCentralCuentas(accion && accion.query ? accion.query : null)
      .pipe(map(data => SharedActions.loadConceptos(
        {Conceptos: ((data && data.Data) ? data.Data : data)})),
        catchError(data => of(SharedActions.CatchError(data)))))
    );
  });

  cargarDocumentos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.subirDocumentos),
      mergeMap((accion) => {
        return this.sharedService.cargarDocumentos(accion.element)
        .pipe(map(data => {
          this.popupManager.showSuccessAlert(this.translate.instant('SOLICITUD_GIRO.carga_documentos_exitosa'));
          return SharedActions.cargarDocumentos({
            DocumentosCarga: (data && data.Data ? data.Data : data)}
          );
        }), catchError(data => of(SharedActions.CatchError(data))));
      })
    );
  });

  getDocumentos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.getDocumentos),
      mergeMap((accion) => this.sharedService.getDocumentos(accion.uid)
      .pipe(map(data => SharedActions.descargarDocumentos(
        {DocumentosDescarga: data})),
        catchError(data => of(SharedActions.CatchError(data)))))
    );
  });

  getSolicitudesById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.getSolicitudesById),
      mergeMap((accion) => this.sharedService.getSolicitudesById(accion.id)
      .pipe(map(data => SharedActions.cargarSolicitudesById(
        {SolicitudesById: ((data && data.Data) ? data.Data : data)})),
        catchError(data => of(SharedActions.CatchError(data)))))
    );
  });

  getOrdenesPagoById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.getOrdenesPagoById),
      mergeMap((accion) => this.sharedService.getOrdenesPagoById(accion.id)
      .pipe(map(data => SharedActions.cargarOrdenesPagoById(
        {OrdenesPagoById: ((data && data.Data) ? data.Data : data)})),
        catchError(data => of(SharedActions.CatchError(data)))))
    );
  });

  getOrdenesPagoByDoc$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.getOrdenesPagoByDoc),
      mergeMap((accion) => this.sharedService.getOrdenesPagoByDoc(accion.documento)
      .pipe(map(data => SharedActions.cargarOrdenesPagoByDoc(
        {OrdenesPagoByDoc: ((data && data.Data) ? data.Data : data)})),
        catchError(data => of(SharedActions.CatchError(data)))))
    );
  });

  getRubro$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.obtenerRubro),
      mergeMap((accion) => this.sharedService.getRubro(accion.codRubro)
          .pipe(map(data => SharedActions.cargarRubro(
            {Rubro: ((data && data.Data) ? data.Data : data)})),
            catchError(data => of(SharedActions.CatchError(data)))))
    );
  });

  getTiposDocumentos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.getTiposDocumentos),
      mergeMap((accion) => this.sharedService.getTiposDocumentos(accion && accion.query ? accion.query : null)
      .pipe(map(data => SharedActions.loadTiposDocumentos(
        {TiposDocumentos: ((data && data.Data) ? data.Data : data)})),
        catchError(data => of(SharedActions.CatchError(data)))))
    );
  });

  getProcesoConfiguracion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.getProcesoConfiguracion),
      mergeMap((accion) => this.sharedService.getProcesoConfiguracion(accion && accion.query ? accion.query : null)
      .pipe(map(data => SharedActions.loadProcesoConfiguracion(
        {Proceso: ((data && data.Data) ? data.Data : data)})),
        catchError(data => of(SharedActions.CatchError(data)))))
    );
  });

  crearConsecutivo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.crearConsecutivo),
      mergeMap((accion) => {
        return this.sharedService.crearConsecutivo(accion.element)
        .pipe(map(data => {
          return SharedActions.loadConsecutivo({
            Consecutivos: (data && data.Data ? data.Data : data)}
          );
        }), catchError(data => of(SharedActions.CatchError(data))));
      })
    );
  });

  getSolicitudesGiro$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.getSolicitudesGiro),
      mergeMap((accion) => {
        return this.sharedService.getAutorizacionGiro(accion.sortby, accion.order, accion.query)
        .pipe(map(data => SharedActions.cargarSolicitudesGiro(
            {SolicitudesGiroShared: ((data && data.Data) ? data.Data : data)})),
            catchError(data => of(SharedActions.CatchError(data))));
      })
    );
  });

  getTiposCompromisos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.getTiposCompromisos),
      mergeMap((accion) => {
        return this.sharedService.getTiposCompromisos(accion.query)
        .pipe(map(data => SharedActions.cargarTiposCompromisos(
          {TiposCompromisos: data})),
          catchError(data => of(SharedActions.CatchError(data))));
      })
    );
  });

  getConvenios$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.getConvenios),
      mergeMap((accion) => {
        return this.sharedService.getConvenios(accion.codigo)
        .pipe(map(data => SharedActions.cargarConvenios(
          {Convenios: data})),
          catchError(data => of(SharedActions.CatchError(data))));
      })
    );
  });

  getTiposOrdenesPago$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.getTiposOrdenesPago),
      mergeMap((accion) => {
        return this.sharedService.getTiposOrdenesPago(accion.query)
        .pipe(map(data => SharedActions.cargarTiposOrdenesPago(
          {TiposOrdenesPago: data})),
          catchError(data => of(SharedActions.CatchError(data))));
      })
    );
  });

  getRPExpedido$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.getRPExpedido),
      mergeMap((accion) => {
        return this.sharedService.getRPExpYParcCompr(accion.vigencia, accion.centroGestor, accion.query)
        .pipe(map(data => SharedActions.cargarRPExpedido(
          {RPExpedido: data})),
          catchError(data => of(SharedActions.CatchError(data))));
      })
    );
  });

  getRPParcialComprometido$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.getRPParcialComprometido),
      mergeMap((accion) => {
        return this.sharedService.getRPExpYParcCompr(accion.vigencia, accion.centroGestor, accion.query)
        .pipe(map(data => SharedActions.cargarRPParcialComprometido(
          {RPParcialComprometido: data})),
          catchError(data => of(SharedActions.CatchError(data))));
      })
    );
  });

  getRPBeneficiario$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.getRPBeneficiario),
      mergeMap((accion) => {
        return this.sharedService.getRPBeneficiario(accion.query)
        .pipe(map(data => SharedActions.cargarRPBeneficiario(
          {RPBeneficiario: data})),
          catchError(data => of(SharedActions.CatchError(data))));
      })
    );
  });

  getRubrosCrp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.getRubrosCrp),
      mergeMap((accion) => {
        return this.sharedService.getRubrosCrp(accion.vigencia, accion.centroGestor, accion.crp)
        .pipe(map(data => SharedActions.cargarRubrosCrp(
          {RubrosCrp: data})),
          catchError(data => of(SharedActions.CatchError(data))));
      })
    );
  });

  getBeneficiarioOP$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.getBeneficiarioOP),
      mergeMap((accion) => {
        return this.sharedService.getBeneficiarioOP(accion.query)
        .pipe(map(data => SharedActions.cargarBeneficiarioOP(
          {BeneficiarioOP: data})),
          catchError(data => of(SharedActions.CatchError(data))));
      })
    );
  });

  getHistorialOP$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.getHistorialOP),
      mergeMap((accion) => {
        return this.sharedService.getHistorialOP(accion.query)
        .pipe(map(data => SharedActions.cargarHistorialOP(
          {HistorialOP: data})),
          catchError(data => of(SharedActions.CatchError(data))));
      })
    );
  });

  getBeneficiarioEndoso$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.getBeneficiarioEndoso),
      mergeMap((accion) => {
        return this.sharedService.getBeneficiarioOP(accion.query)
        .pipe(map(data => SharedActions.cargarBeneficiarioEndoso(
          {BeneficiarioEndoso: data})),
          catchError(data => of(SharedActions.CatchError(data))));
      })
    );
  });

  getEntradaAlmacen$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.getEntradaAlmacen),
      mergeMap((accion) => {
        return this.sharedService.getEntradaAlmacen(accion.query)
        .pipe(map(data => SharedActions.cargarEntradaAlmacen(
          {EntradaAlmacen: data})),
          catchError(data => of(SharedActions.CatchError(data))));
      })
    );
  });

  getInfoRubro$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.getInfoRubro),
      mergeMap((accion) => {
        return this.sharedService.getInfoRubro(accion.rubro)
        .pipe(map(data => SharedActions.cargarInfoRubro(
          {InfoRubro: data})),
          catchError(data => of(SharedActions.CatchError(data))));
      })
    );
  });

  getInfoNecesidad$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.getInfoNecesidad),
      mergeMap((accion) => {
        return this.sharedService.getInfoNecesidad(accion.cdp)
        .pipe(map(data => SharedActions.cargarInfoNecesidad(
          {InfoNecesidad: data})),
          catchError(data => of(SharedActions.CatchError(data))));
      })
    );
  });

  getMetaNecesidad$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.getMetaNecesidad),
      mergeMap((accion) => {
        return this.sharedService.getMetaNecesidad(accion.meta)
        .pipe(map(data => SharedActions.cargarMetaNecesidad(
          {MetaNecesidad: data})),
          catchError(data => of(SharedActions.CatchError(data))));
      })
    );
  });

  getActividadesNecesidad$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.getActividadesNecesidad),
      mergeMap((accion) => {
        return this.sharedService.getActividadesNecesidad(accion.actividad)
        .pipe(map(data => SharedActions.cargarActividadesNecesidad(
          {ActividadNecesidad: data})),
          catchError(data => of(SharedActions.CatchError(data))));
      })
    );
  });

  getRetenciones$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.getRetenciones),
      mergeMap((accion) => {
        return this.sharedService.getRetenciones(accion.query)
        .pipe(map(data => SharedActions.cargarRetenciones(
          {Retenciones: data})),
          catchError(data => of(SharedActions.CatchError(data))));
      })
    );
  });

  getInfoCuentaContable$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.getInfoCuentaContable),
      mergeMap((accion) => {
        return this.sharedService.getInfoCuentaContable(accion.codigo)
        .pipe(map(data => SharedActions.cargarInfoCuentaContable(
          {InfoCuentaContable: data})),
          catchError(data => of(SharedActions.CatchError(data))));
      })
    );
  });

  getInfoCuentaContableDebito$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.getInfoCuentaContableDebito),
      mergeMap((accion) => {
        return this.sharedService.getInfoCuentaContable(accion.codigo)
        .pipe(map(data => SharedActions.cargarInfoCuentaContableDebito(
          {InfoCuentaContableDebito: data})),
          catchError(data => of(SharedActions.CatchError(data))));
      })
    );
  });

  getInfoCuentaContableEndoso$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.getInfoCuentaContableEndoso),
      mergeMap((accion) => {
        return this.sharedService.getInfoCuentaContable(accion.codigo)
        .pipe(map(data => SharedActions.cargarInfoCuentaContableEndoso(
          {InfoCuentaContableEndoso: data})),
          catchError(data => of(SharedActions.CatchError(data))));
      })
    );
  });

  GetArbolCuentaContableCredito$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.GetArbolCuentaContable),
      mergeMap((branch) =>
        this.sharedService.getArbolCuentaContable()
          .pipe(
            map(data => SharedActions.LoadArbolCuentaContable(data)),
            catchError(data => of(SharedActions.CatchError(data))))
      )
    );
  });

  getSupervisor$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.getSupervisor),
      mergeMap((accion) => {
        return this.sharedService.getSupervisor(accion.vigencia, accion.documento)
        .pipe(map(data => SharedActions.cargarSupervisor(
          {Supervisor: data})),
          catchError(data => of(SharedActions.CatchError(data))));
      })
    );
  });
}
