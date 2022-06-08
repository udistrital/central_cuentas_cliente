import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { actualizarOrdenDevolucion, getOrdenesDevolucion } from '../../actions/ordenesdevolucion.actions';
import { CONFIGURACION_TABLAREGISTROS, DATOS_TABLAREGISTROS } from '../../interfaces/interfaces';
import { selectOrdenesDevolucion } from '../../selectors/ordenesdevolucion.selectors';

@Component({
  selector: 'ngx-table-ordenesdevolucion',
  templateUrl: './table-ordenesdevolucion.component.html',
  styleUrls: ['./table-ordenesdevolucion.component.scss']
})
export class TableOrdenesdevolucionComponent implements OnInit {

  subOrdenesDevolucion$: any;
  ordenesDevolucion: any;
  dataSource;
  columnNames;
  displayedColumns = [];
  configuracion: any;
  datosTabla: any;
  tituloAccion: string;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private translate: TranslateService,
    private store: Store<any>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.tituloAccion = this.activatedRoute.snapshot.url[0].path;
    this.configuracion = CONFIGURACION_TABLAREGISTROS;
    this.datosTabla = DATOS_TABLAREGISTROS;
    this.store.dispatch(getOrdenesDevolucion({sortby: ['Consecutivo'], order: ['desc']}));
   }

  ngOnInit() {
    this.displayedColumns = this.configuracion.dataConfig.map(x => x.key);
    this.columnNames = this.configuracion.dataConfig;
    this.subOrdenesDevolucion$ = this.store.select(selectOrdenesDevolucion).subscribe((accion: any) => {
      if (accion && accion.OrdenesDevolucion) {
        this.ordenesDevolucion = accion.OrdenesDevolucion;
        this.buildTable();
      }
    });
  }

  buildTable() {
    const tableArr: Element[] = [];
    this.ordenesDevolucion.forEach(elemento => {
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

  editarOrdenDevolucion(ordenDevolucion: any) {
    this.router.navigateByUrl('pages/ordenesdevolucion/editar/' + ordenDevolucion.Id);
  }

  ver(ordenDevolucion: any) {
    this.router.navigateByUrl('pages/ordenesdevolucion/ver/' + ordenDevolucion.Id);
  }

  revision(ordenDevolucion: any) {
    this.router.navigateByUrl('pages/ordenesdevolucion/revisar/' + ordenDevolucion.Id);
  }

  enviarRevision(ordenDevolucion: any) {
    const element = this.ordenesDevolucion[this.ordenesDevolucion.findIndex((e: any) => e._id === ordenDevolucion.Id)];
    element.Estado = revision[0];
    this.store.dispatch(actualizarOrdenDevolucion({id: element._id, element: element, path: this.tituloAccion}));
  }

  edicion(action: string): boolean {
    const ACCIONES_EDICION: string[] = edicion;
    return ACCIONES_EDICION.some(acc => acc === action);
  }

  revisar(action: string): boolean {
    const ACCIONES_REVISION: string[] = revision;
    return ACCIONES_REVISION.some(acc => acc === action);
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
  'Aprobado'
];

const edicion = [
  'Elaborado',
  'Rechazado'
];
