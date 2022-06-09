import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { DATOS_TABLAREGISTROS, CONFIGURACION_TABLAREGISTROS } from '../../interfaces/interfaces';
import { getFilaSeleccionada, getAccionTabla } from '../../../../shared/selectors/shared.selectors';
import { actualizarDevolucionTributaria, getDevolucionesTributarias, loadDevoluciontributariaSeleccionado } from '../../../devoluciontributaria/actions/devoluciontributaria.actions';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { selectDevolucionTributaria } from '../../selectors/devoluciontributaria.selectors';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-table-devoluciontributaria',
  templateUrl: './table-devoluciontributaria.component.html',
  styleUrls: ['./table-devoluciontributaria.component.scss']
})
export class TableDevoluciontributariaComponent implements OnInit, OnDestroy {

  configuracion: any;
  datosTabla: any;
  subscription$: any;
  dataSource;
  columnNames;
  displayedColumns = [];
  devolucionesTributarias: any;
  subDevolucionesTributarias$: any;
  tituloAccion: string;

  @Output() selectedAction: EventEmitter<any>;
  stringBusqueda: string;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor (
    private store: Store<any>,
    private translate: TranslateService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.tituloAccion = this.activatedRoute.snapshot.url[0].path;
    this.datosTabla = DATOS_TABLAREGISTROS;
    this.configuracion = CONFIGURACION_TABLAREGISTROS;
    this.stringBusqueda = '';
    this.selectedAction = new EventEmitter<any>();
    this.store.dispatch(getDevolucionesTributarias({sortby: ['Consecutivo'], order: ['desc']}));
    for (let i = 0; i < this.configuracion.dataConfig.length; i++) {
      this.configuracion.dataConfig[i].title.name = this.translate
      .instant('DEVOL_TRIBUTARIA.' + this.configuracion.dataConfig[i].title.label_i18n);
    }
  }
  ngOnDestroy(): void {
    this.subDevolucionesTributarias$.unsubscribe();
  }

  buildTable() {
    const tableArr: Element[] = [];
    this.devolucionesTributarias.forEach(elemento => {
      const element: Element = {
        Consecutivo: elemento.Consecutivo,
        NombreBeneficiario: elemento.NombreBeneficiario,
        Estado: elemento.Estado,
        Id: elemento._id,
        acciones: '',
        edicion: this.edicion(elemento.Estado),
        revision: this.revisar(elemento.Estado)
      };
      tableArr.push(element);
      this.dataSource = new MatTableDataSource(tableArr);
      this.dataSource.paginator = this.paginator;
    });
  }

  edicion(action: string): boolean {
    const ACCIONES_EDICION: string[] = edicion;
    return ACCIONES_EDICION.some(acc => acc === action);
  }

  revisar(action: string): boolean {
    const ACCIONES_REVISION: string[] = revision;
    return ACCIONES_REVISION.some(acc => acc === action);
  }

  ngOnInit() {
    this.displayedColumns = this.configuracion.dataConfig.map(x => x.key);
    this.columnNames = this.configuracion.dataConfig;
    this.subDevolucionesTributarias$ = this.store.select(selectDevolucionTributaria).subscribe((accion: any) => {
      if (accion && accion.DevolucionTributaria) {
        this.devolucionesTributarias = accion.DevolucionTributaria;
        this.buildTable();
      }
    });
    this.subscription$ = this.store.select(getFilaSeleccionada).subscribe((fila: any) => {

      if (fila) {

        this.store.dispatch(loadDevoluciontributariaSeleccionado(fila.fila));
      }
    });
    this.subscription$ = this.store.select(getAccionTabla).subscribe((accion: any) => {

      this.store.dispatch(loadDevoluciontributariaSeleccionado(null));
    });
  }

  editarDevolucionTributaria(devolucionTriburaria: any) {
    this.router.navigateByUrl('pages/devoluciontributaria/editar/' + devolucionTriburaria.Id);
  }

  ver(devolucionTriburaria: any) {
    this.router.navigateByUrl('pages/devoluciontributaria/ver/' + devolucionTriburaria.Id);
  }

  revision(devolucionTriburaria: any) {
    this.router.navigateByUrl('pages/devoluciontributaria/revisar/' + devolucionTriburaria.Id);
  }

  enviarRevision(devolucionTriburaria: any) {
    const element = this.devolucionesTributarias[this.devolucionesTributarias.findIndex((e: any) => e._id === devolucionTriburaria.Id)];
    element.Estado = revision[0];
    this.store.dispatch(actualizarDevolucionTributaria({id: element._id, element: element, path: this.tituloAccion}));
  }
}

export interface Element {
  Consecutivo: string;
  NombreBeneficiario: string;
  Estado: string;
  Id: string;
  acciones: string;
  edicion: boolean;
  revision: boolean;
}

const revision = [
  'Por revisar contabilidad',
  'Por revisar presupuesto',
  'Por revisar tesorería',
  'Aprobado'
];

const edicion = [
  'Elaborado',
  'Rechazado'
];
