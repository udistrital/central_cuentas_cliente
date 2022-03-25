import { DatePipe } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild, ViewChildren } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { getAccionTabla, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { actualizarAutorizacionGiro, getSolicitudesGiro, loadSolicitudgiroSeleccionado } from '../../actions/solicitudesgiros.actions';
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
  tituloAccion: string;

  constructor (
    private store: Store<any>,
    private router: Router,
    private translate: TranslateService,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe
  ) {
    this.tituloAccion = this.activatedRoute.snapshot.url[0].path;
    this.datosTabla = [];
    this.configSolicitudes = CONFIGURACION_TABLAREGISTROS;
    for (let i = 0; i < this.configSolicitudes.dataConfig; i++) {
      this.configSolicitudes.dataConfig[i].title.name = this.translate.instant('BANCO.' + this.configSolicitudes.dataConfig[i].title.name_i18n);
    }

    this.stringBusqueda = '';
    this.selectedAction = new EventEmitter<any>();
    this.store.dispatch(getSolicitudesGiro({sortby: ['Numero_Solicitud'], order: ['desc']}));
  }
  ngOnDestroy(): void {
    this.datosTabla = [];
    this.subSolicitudesGiro$.unsubscribe();
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

  enviarRevision(solicitud: any) {
    const element = this.solicitudesGiro[this.solicitudesGiro.findIndex((e: any) => e.Numero_Solicitud === solicitud.NumeroSolicitud)];
    element.Estado = 'Por revisar';
    this.store.dispatch(actualizarAutorizacionGiro({id: element._id, element: element, path: this.tituloAccion}));
  }

  revision(solicitud: any) {
    this.router.navigateByUrl('pages/solicitudesgiros/revisar/' + solicitud.Id);
  }

  buildTable() {
    const tableArr: Element[] = [];
    this.solicitudesGiro.forEach(elemento => {
      const element: Element = {
        NumeroSolicitud: elemento.Numero_Solicitud,
        NombreBeneficiario: elemento.Nombre_Beneficiario,
        Fecha: this.datePipe.transform(elemento.Fecha_creacion, 'dd-MM-yyyy'),
        Estado: elemento.Estado,
        estado: true,
        Id: elemento._id,
        acciones: ''
      };
      tableArr.push(element);
    });
    this.dataSource = new MatTableDataSource(tableArr);
    this.dataSource.paginator = this.paginator;
  }

  editarSolicitud(solicitud: any) {
    this.router.navigateByUrl('pages/solicitudesgiros/editar/' + solicitud.Id);
  }

  ver(solicitud: any) {
    this.router.navigateByUrl('pages/solicitudesgiros/ver/' + solicitud.Id);
  }

}

export interface Element {
  NumeroSolicitud: number;
  NombreBeneficiario: string;
  Fecha: string;
  Estado: string;
  Id: string;
  estado: boolean;
  acciones: string;
}
