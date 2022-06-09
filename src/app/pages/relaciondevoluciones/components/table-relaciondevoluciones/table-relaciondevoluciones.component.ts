import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { actualizarRelacionDevoluciones, getRelacionDevoluciones } from '../../actions/relaciondevoluciones.actions';
import { CONFIGURACION_TABLAREGISTROS, DATOS_TABLAREGISTROS } from '../../interfaces/interfaces';
import { selectRelacionDevoluciones } from '../../selectors/relaciondevoluciones.selectors';

@Component({
  selector: 'ngx-table-relaciondevoluciones',
  templateUrl: './table-relaciondevoluciones.component.html',
  styleUrls: ['./table-relaciondevoluciones.component.scss']
})
export class TableRelaciondevolucionesComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  configuracion: any;
  datosTabla: any;
  dataSource;
  columnNames;
  displayedColumns = [];
  tituloAccion: string;
  subRelacionDevoluciones$: any;
  relacionDevoluciones: any;

  constructor(
    private store: Store<any>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.tituloAccion = this.activatedRoute.snapshot.url[0].path;
    this.configuracion = CONFIGURACION_TABLAREGISTROS;
    this.datosTabla = DATOS_TABLAREGISTROS;
    this.store.dispatch(getRelacionDevoluciones({sortby: ['Consecutivo'], order: ['desc']}));
  }

  ngOnDestroy() {
    this.subRelacionDevoluciones$.unsubscribe();
  }

  ngOnInit() {
    this.displayedColumns = this.configuracion.dataConfig.map(x => x.key);
    this.columnNames = this.configuracion.dataConfig;
    this.subRelacionDevoluciones$ = this.store.select(selectRelacionDevoluciones).subscribe((accion: any) => {
      if (accion && accion.RelacionDevoluciones) {
        this.relacionDevoluciones = accion.RelacionDevoluciones;
        this.buildTable();
      }
    });
  }

  editarRelacionDevoluciones(relacionDevoluciones: any) {
    this.router.navigateByUrl('pages/relaciondevoluciones/editar/' + relacionDevoluciones.Id);
  }

  ver(relacionDevoluciones: any) {
    this.router.navigateByUrl('pages/relaciondevoluciones/ver/' + relacionDevoluciones.Id);
  }

  revision(relacionDevoluciones: any) {
    this.router.navigateByUrl('pages/relaciondevoluciones/revisar/' + relacionDevoluciones.Id);
  }

  enviarRevision(relacionDevoluciones: any) {
    const element = this.relacionDevoluciones[this.relacionDevoluciones.findIndex((e: any) => e._id === relacionDevoluciones.Id)];
    element.Estado = revision[0];
    this.store.dispatch(actualizarRelacionDevoluciones({id: element._id, element: element, path: this.tituloAccion}));
  }

  edicion(action: string): boolean {
    const ACCIONES_EDICION: string[] = edicion;
    return ACCIONES_EDICION.some(acc => acc === action);
  }

  revisar(action: string): boolean {
    const ACCIONES_REVISION: string[] = revision;
    return ACCIONES_REVISION.some(acc => acc === action);
  }

  buildTable() {
    const tableArr: Element[] = [];
    this.relacionDevoluciones.forEach(elemento => {
      const element: Element = {
        Consecutivo: elemento.Consecutivo,
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
}

export interface Element {
  Consecutivo: number;
  Estado: string;
  Id: string;
  acciones: string;
  edicion: boolean;
  revision: boolean;
}

const revision = [
  'Por revisar contabilidad',
  'Por revisar presupuesto',
  'Aprobado'
];

const edicion = [
  'Elaborado',
  'Rechazado'
];
