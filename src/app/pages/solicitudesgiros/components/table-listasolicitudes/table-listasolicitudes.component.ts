import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild, ViewChildren } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { NbTreeGridDataSource, NbTreeGridRowComponent, NbTreeGridDataSourceBuilder, } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { getDatosID } from '../../../../shared/actions/shared.actions';
import { getAccionTabla, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { getSolicitudesGiro, loadSolicitudgiroSeleccionado } from '../../actions/solicitudesgiros.actions';
import { CONFIGURACION_TABLAREGISTROS, EstructuraArbolRubrosApropiaciones } from '../../interfaces/interfaces';

@Component({
  selector: 'ngx-table-listasolicitudes',
  templateUrl: './table-listasolicitudes.component.html',
  styleUrls: ['./table-listasolicitudes.component.scss']
})
export class TableListasolicitudesComponent implements OnInit, OnDestroy {

  configuracion: any;
  datosTabla: any;
  subscription$: any;
  subSolicitudesGiro$: any;
  solicitudesGiro: any;
  dataSource;
  configSolicitudes: any;
  displayedColumns = [];
  columnNames;
  @Output() selectedAction: EventEmitter<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  stringBusqueda: string;

  constructor (
    private store: Store<any>,
    private router: Router,
    private translate: TranslateService
  ) {
    this.datosTabla = [];
    this.configSolicitudes = CONFIGURACION_TABLAREGISTROS;
    for (let i = 0; i < this.configSolicitudes.dataConfig; i++) {
      this.configSolicitudes.dataConfig[i].title.name = this.translate.instant('BANCO.' + this.configSolicitudes.dataConfig[i].title.name_i18n);
    }

    this.stringBusqueda = '';
    this.selectedAction = new EventEmitter<any>();
    this.store.dispatch(getSolicitudesGiro({}));
  }
  ngOnDestroy(): void {
    this.datosTabla = [];
  }

  ngOnInit() {
    this.displayedColumns = this.configSolicitudes.dataConfig.map(x => x.key);
    this.columnNames = this.configSolicitudes.dataConfig;
    this.subSolicitudesGiro$ = this.store.select(getSolicitudesGiro).subscribe((accion: any) => {
      if (accion && accion.solicitudesgiros.SolicitudesGiro) {
        this.solicitudesGiro = accion.solicitudesgiros.SolicitudesGiro.SolicitudesGiro;
        this.buildTable();
      }
    });

    this.subscription$ = this.store.select(getFilaSeleccionada).subscribe((fila: any) => {
      if (fila) {
        this.store.dispatch(loadSolicitudgiroSeleccionado(fila.fila));
      }
    });

    this.subscription$ = this.store.select(getAccionTabla).subscribe((accion: any) => {
      this.store.dispatch(loadSolicitudgiroSeleccionado(null));
    });
  }

  buildTable() {
    const tableArr: Element[] = [];
    for (let index = 0; index < this.solicitudesGiro.length; index++) {
      const element: Element = {
        NumeroSolicitud: index,
        NombreBeneficiario: this.solicitudesGiro[index].Nombre_Beneficiario,
        Fecha: this.solicitudesGiro[index].Fecha_creacion,
        Estado: 'Elaborado',
        estado: true,
        Id: this.solicitudesGiro[index]._id,
        acciones: ''
      };
      tableArr.push(element);
    }
    this.dataSource = new MatTableDataSource(tableArr);
    this.dataSource.paginator = this.paginator;
  }

  editarSolicitud(solicitud: any) {
    this.router.navigateByUrl('pages/solicitudesgiros/editar/' + solicitud.Id);
  }
}

export interface Element {
  NumeroSolicitud: number;
  NombreBeneficiario: string;
  Fecha: Date;
  Estado: string;
  Id: string;
  estado: boolean;
  acciones: string;
}
