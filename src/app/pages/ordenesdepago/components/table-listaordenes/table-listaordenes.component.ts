import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getBeneficiarioOP, LoadFilaSeleccionada } from '../../../../shared/actions/shared.actions';
import { getAccionTabla, getFilaSeleccionada, selectBeneficiarioOP } from '../../../../shared/selectors/shared.selectors';
import { getOrdenesPago, loadOrdenPagoSeleccionado } from '../../actions/ordenespago.actions';
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
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(
    private store: Store<any>,
    private router: Router,
  ) {
    this.datosPrueba = DATOS_TABLAREGISTROS;
    this.configuracion = CONFIGURACION_TABLAREGISTROS;
    this.store.dispatch(getOrdenesPago({sortby: ['Numero_Solicitud'], order: ['desc']}));
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

  buildTable() {
    const tableArr: Element[] = [];
    this.ordenesPago.forEach(elemento => {
      const element: Element = {
        NumeroOrden: elemento.Consecutivo,
        NombreBeneficiario: elemento.NombreBeneficiario,
        AutorizacionGiro: elemento.SolicitudGiro,
        Estado: 'Elaborado',
        Id: elemento._id,
        acciones: ''
      };
      tableArr.push(element);
      this.dataSource = new MatTableDataSource(tableArr);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnDestroy() {
    this.subOrdenesPago$.unsubscribe();
  }
}

export interface Element {
  NumeroOrden: string;
  NombreBeneficiario: string;
  AutorizacionGiro: string;
  Estado: string;
  Id: string;
  acciones: string;
}
