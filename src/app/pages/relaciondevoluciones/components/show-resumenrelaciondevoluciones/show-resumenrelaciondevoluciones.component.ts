import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { crearConsecutivo, getProcesoConfiguracion } from '../../../../shared/actions/shared.actions';
import { selectConsecutivo, selectProcesoConfiguracion } from '../../../../shared/selectors/shared.selectors';
import { actualizarRelacionDevoluciones, crearRelacionDevoluciones } from '../../actions/relaciondevoluciones.actions';
import { CONFIGURACION_CONSULTAOD } from '../../interfaces/interfaces';
import { selectDatosRelacion, selectInfoRelacionDevoluciones, selectRelacionDevoluciones } from '../../selectors/relaciondevoluciones.selectors';

@Component({
  selector: 'ngx-show-resumenrelaciondevoluciones',
  templateUrl: './show-resumenrelaciondevoluciones.component.html',
  styleUrls: ['./show-resumenrelaciondevoluciones.component.scss']
})
export class ShowResumenRelacionDevolucionesComponent implements OnInit, OnDestroy {

  tituloAccion: string;
  subProceso$: any;
  proceso: any;
  subConsecutivo$: any;
  subRelacionDevoluciones$: any;
  relacionDevoluciones: any;
  subDatosRelacion$: any;
  datosRelacion: any;
  configuracionTabla: any;
  datosTabla: any;
  total: number;

  constructor(
    private store: Store<any>,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
  ) {
    this.configuracionTabla = Object.assign({}, CONFIGURACION_CONSULTAOD);
    this.configuracionTabla.checkElement = null;
    this.configuracionTabla.rowActions = null;
    this.datosTabla = [];
    this.tituloAccion = this.activatedRoute.snapshot.url[0].path;
    this.store.dispatch(getProcesoConfiguracion({query: {Sigla: 'RD'}}));
    this.total = 0;
    for (let i = 0; i < this.configuracionTabla.dataConfig.length; i++) {
      this.configuracionTabla.dataConfig[i].title.name = this.translate.instant('RELACION_DEVOLUCIONES.' + this.configuracionTabla.dataConfig[i].title.label_i18n);
    }
   }

  ngOnDestroy() {
    if (this.subRelacionDevoluciones$) this.subRelacionDevoluciones$.unsubscribe();
    if (this.subDatosRelacion$) this.subDatosRelacion$.unsubscribe();
  }

  ngOnInit() {
    this.subRelacionDevoluciones$ = this.store.select(selectInfoRelacionDevoluciones).subscribe(action => {
      if (action && action.InfoRelacionDevoluciones) {
        this.relacionDevoluciones = action.InfoRelacionDevoluciones;
      }
    });
    this.subDatosRelacion$ = this.store.select(selectDatosRelacion).subscribe(action => {
      if (action) {
        this.datosTabla = action.data;
        this.total = 0;
        this.datosTabla.forEach(element => {
          this.total += element.Valor;
        });
      }
    });
    this.subProceso$ = this.store.select(selectProcesoConfiguracion).subscribe((action) => {
      if (action && action.Proceso) {
        this.proceso = action.Proceso[0];
      }
    });
  }

  guardar(revisar: string) {
    const elemento = {
      Activo: true,
      AreaFuncional: this.relacionDevoluciones.areaFuncional.Id,
      FechaInicio: this.relacionDevoluciones.fechaInicio,
      FechaFin: this.relacionDevoluciones.fechaFin,
      Consecutivo: this.relacionDevoluciones.consecutivo,
      OrdenesDevolucion: this.datosTabla,
      Estado: this.relacionDevoluciones.estado
    };
    if (this.tituloAccion === 'editar') {
      elemento.Estado = Aprobacion.elaborado;
      this.store.dispatch(actualizarRelacionDevoluciones({id: this.activatedRoute.snapshot.url[1].path, element: elemento}));
    } else if (this.tituloAccion === 'revisar') {
      if (revisar === 'aprobar') this.aprobar(elemento);
      else if (revisar === 'rechazar') this.rechazar(elemento);
    } else {
      const consecutivo = {
        ContextoId: this.proceso.Id,
        Year: new Date().getFullYear(),
        Descripcion: 'Relacion de devoluciones'
      };
      elemento.Estado = Aprobacion.elaborado;
      this.store.dispatch(crearConsecutivo({element: consecutivo}));
      this.subConsecutivo$ = this.store.select(selectConsecutivo).subscribe((accion) => {
        if (accion && accion.Consecutivos) {
          elemento.Consecutivo = accion.Consecutivos.Consecutivo;
          this.store.dispatch(crearRelacionDevoluciones({element: elemento}));
        }
      });
    }
  }

  aprobar(elemento: any) {
    Swal.fire({
      title: this.translate.instant('GLOBAL.aprobar'),
      text: this.translate.instant('ORDEN_PAGO.seguro_aprobacion'),
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d00000',
      confirmButtonColor: 'rgb(243, 161, 9)',
      confirmButtonText: this.translate.instant('GLOBAL.si_aprobar')
    }).then((result) => {
      if (result.value === true) {
        switch (elemento.Estado) {
          case Aprobacion.revCont: {
            elemento.Estado = Aprobacion.revPres;
            break;
          }
          case Aprobacion.revPres: {
            elemento.Estado = Aprobacion.aprobado;
            break;
          }
          case Aprobacion.aprobado: {
            elemento.Estado = Aprobacion.firmado;
            break;
          }
        }
        this.store.dispatch(actualizarRelacionDevoluciones({id: this.activatedRoute.snapshot.url[1].path, element: elemento}));
      }
    });
  }

  rechazar(elemento: any) {
    Swal.fire({
      title: this.translate.instant('GLOBAL.rechazar'),
      text: this.translate.instant('ORDEN_PAGO.seguro_rechazo'),
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d00000',
      confirmButtonColor: 'rgb(243, 161, 9)',
      confirmButtonText: this.translate.instant('GLOBAL.si_rechazar')
    }).then((result) => {
      if (result.value === true) {
        elemento.Estado = Aprobacion.rechazado;
        this.store.dispatch(actualizarRelacionDevoluciones({id: this.activatedRoute.snapshot.url[1].path, element: elemento}));
      }
    });
  }
}

enum Aprobacion {
  elaborado = 'Elaborado',
  revCont = 'Por revisar contabilidad',
  revPres = 'Por revisar presupuesto',
  aprobado = 'Aprobado',
  firmado = 'Firmado',
  rechazado = 'Rechazado'
}

