import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { getDatosID } from '../../../../shared/actions/shared.actions';
import { getAccionTabla, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { getSolicitudesGiro, loadSolicitudgiroSeleccionado } from '../../actions/solicitudesgiros.actions';
import { CONFIGURACION_TABLAREGISTROS } from '../../interfaces/interfaces';

@Component({
  selector: 'ngx-table-listasolicitudes',
  templateUrl: './table-listasolicitudes.component.html',
  styleUrls: ['./table-listasolicitudes.component.scss']
})
export class TableListasolicitudesComponent implements OnInit {

  configuracion: any;
  datosTabla: any;
  subscription$: any;
  subSolicitudesGiro$: any;
  solicitudesGiro: any;

  @Output() selectedAction: EventEmitter<any>;
  stringBusqueda: string;

  constructor (
    private store: Store<any>
  ) {
    this.datosTabla = [];
    this.configuracion = CONFIGURACION_TABLAREGISTROS;

    this.stringBusqueda = '';
    this.selectedAction = new EventEmitter<any>();
    this.store.dispatch(getSolicitudesGiro({}));
  }

  ngOnInit() {

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
    for (let index = 0; index < this.solicitudesGiro.length; index++) {
      const element = {
        NumeroSolicitud: index,
        NombreBeneficiario: this.solicitudesGiro[index].Nombre_Beneficiario,
        Fecha: this.solicitudesGiro[index].Fecha_creacion,
        Estado: 'Elaborado'
      };
      this.datosTabla.push(element);
    }
  }
}
