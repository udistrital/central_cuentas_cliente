import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Store } from '@ngrx/store';
import { getSolicitudesGiro, loadSolicitudGiroSeleccionada } from '../../actions/shared.actions';
import { CONFIGURACION_TABLAREGISTROS } from '../../interfaces/interfaces';
import { selectSolicitudesGiroShared } from '../../selectors/shared.selectors';

@Component({
  selector: 'ngx-autorizacion-giro',
  templateUrl: './autorizacion-giro.component.html',
  styleUrls: ['./autorizacion-giro.component.scss']
})
export class AutorizacionGiroComponent implements OnInit {

  subSolicitudesGiro$: any;
  solicitudesGiro: any;
  dataSource;
  configSolicitudes: any;
  columnNames;
  displayedColumns = [];
  selectedRowIndex: string;
  solicitudGiro: any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private store: Store<any>,
    private datePipe: DatePipe
  ) {
    this.configSolicitudes = CONFIGURACION_TABLAREGISTROS;
    this.store.dispatch(getSolicitudesGiro({sortby: ['Numero_Solicitud'], order: ['desc'], query: {Estado: 'Aprobado'}}));
   }

  ngOnInit() {
    this.displayedColumns = this.configSolicitudes.dataConfig.map(x => x.key);
    this.columnNames = this.configSolicitudes.dataConfig;
    this.subSolicitudesGiro$ = this.store.select(selectSolicitudesGiroShared).subscribe((accion: any) => {
      if (accion && accion.SolicitudesGiroShared) {
        this.solicitudesGiro = accion.SolicitudesGiroShared;
        this.buildTable();
      }
    });
  }


  buildTable() {
    const tableArr: Element[] = [];
    for (let index = 0; index < this.solicitudesGiro.length; index++) {
      const element: Element = {
        NumeroSolicitud: this.solicitudesGiro[index].Numero_Solicitud,
        NombreBeneficiario: this.solicitudesGiro[index].Nombre_Beneficiario,
        estado: true,
        Id: this.solicitudesGiro[index]._id,
      };
      tableArr.push(element);
    }
    this.dataSource = new MatTableDataSource(tableArr);
    this.dataSource.paginator = this.paginator;
  }

  agregarSolicitud(solicitud: any) {
    this.store.dispatch(loadSolicitudGiroSeleccionada(solicitud));
    this.selectedRowIndex = solicitud.Id;
  }
}

export interface Element {
  NumeroSolicitud: number;
  NombreBeneficiario: string;
  Id: string;
  estado: boolean;
}
