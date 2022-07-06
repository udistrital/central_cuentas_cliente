import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getBeneficiarioOP, LoadFilaSeleccionada } from '../../../../shared/actions/shared.actions';
import { getAccionTabla, getFilaSeleccionada, selectBeneficiarioOP } from '../../../../shared/selectors/shared.selectors';
import { actualizarOrdenPago, getOrdenesPago, loadOrdenPagoSeleccionado } from '../../actions/ordenespago.actions';
import { CONFIGURACION_TABLAREGISTROS, DATOS_TABLAREGISTROS } from '../../interfaces/interfaces';

@Component({
  selector: 'ngx-table-listaordenes',
  templateUrl: './table-listaordenes.component.html',
  styleUrls: ['./table-listaordenes.component.scss']
})
export class TableListaordenesComponent implements OnInit, OnDestroy {

  configuracion: any;
  datosPrueba: any;
  subscription$: any;
  dataSource;
  columnNames;
  displayedColumns = [];
  subOrdenesPago$: any;
  ordenesPago: any;
  subBeneficiario$: any;
  beneficiario: any;
  tituloAccion: string;
  mostrarEditar: boolean;
  mostrarRevisar: boolean;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(
    private store: Store<any>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.datosPrueba = DATOS_TABLAREGISTROS;
    this.configuracion = CONFIGURACION_TABLAREGISTROS;
    this.tituloAccion = this.activatedRoute.snapshot.url[0].path;
    this.store.dispatch(getOrdenesPago({sortby: ['Consecutivo'], order: ['desc']}));
    this.store.dispatch(LoadFilaSeleccionada(null));
  }

  ngOnInit() {
    this.displayedColumns = this.configuracion.dataConfig.map(x => x.key);
    this.columnNames = this.configuracion.dataConfig;
    this.subOrdenesPago$ = this.store.select(getOrdenesPago).subscribe((accion: any) => {
      if (accion && accion.ordenespago.OrdenesPago) {
        this.ordenesPago = accion.ordenespago.OrdenesPago.OrdenesPago;
        accion.ordenespago.OrdenesPago = null;
        this.buildTable();
      }
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

  buildTable() {
    const tableArr: Element[] = [];
    this.ordenesPago.forEach(elemento => {
      const element: Element = {
        NumeroOrden: elemento.Consecutivo,
        NombreBeneficiario: elemento.NombreBeneficiario,
        AutorizacionGiro: elemento.SolicitudGiro,
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

  ngOnDestroy() {
    this.subOrdenesPago$.unsubscribe();
  }

  ver(ordenPago: any) {
    this.router.navigateByUrl('pages/ordenespago/ver/' + ordenPago.Id);
  }

  editarOP(ordenPago: any) {
    this.router.navigateByUrl('pages/ordenespago/editar/' + ordenPago.Id);
  }

  enviarRevision(ordenPago: any) {
    const element = this.ordenesPago[this.ordenesPago.findIndex((e: any) => e._id === ordenPago.Id)];
    element.Estado = revision[0];
    this.store.dispatch(actualizarOrdenPago({id: element._id, element: element, path: this.tituloAccion}));
  }

  contabilizar(ordenPago: any) {
    this.router.navigateByUrl('pages/ordenespago/contabilizar/' + ordenPago.Id);
  }

  revision(ordenPago: any) {
    this.router.navigateByUrl('pages/ordenespago/revisar/' + ordenPago.Id);
  }
}

export interface Element {
  NumeroOrden: string;
  NombreBeneficiario: string;
  AutorizacionGiro: string;
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
