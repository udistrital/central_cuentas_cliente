import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAccionTabla, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { loadRelacionautorizacionesSeleccionado } from '../../actions/relacionautorizaciones.actions';
import { CONFIGURACION_TABLAREGISTROS, DATOS_TABLAREGISTROS } from '../../interfaces/interfaces';
import { RelacionautorizacionesService } from '../../services/relacionautorizaciones.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-table-autorizacionnomina',
  templateUrl: './table-autorizacionnomina.component.html',
  styleUrls: ['./table-autorizacionnomina.component.scss']
})
export class TableAutorizacionnominaComponent implements OnInit {

  configuracion: any;
  datosTabla: any;
  subscription$: any;
  // Variable local para mostrar datos desde servicio
  relacion: any = {};

  @Output() selectedAction: EventEmitter<any>;
  stringBusqueda: string;

  constructor (
    private store: Store<any>,
    private _relacionService: RelacionautorizacionesService,
    private activatedRoute: ActivatedRoute
  ) {
    // Datos de ejemplo q se muestran en la tabla
    this.datosTabla = DATOS_TABLAREGISTROS;
    this.configuracion = CONFIGURACION_TABLAREGISTROS;
    // Configuracion de la tabla
    this.stringBusqueda = '';
    this.selectedAction = new EventEmitter<any>();
    // Configuracion de enrutamiento de datos (nomina o seguridad social)
    this.activatedRoute.params.subscribe( params => {
      this.relacion = this._relacionService.getTipoRelacion( params['id'] );
    });

  }

  ngOnInit() {
    this.subscription$ = this.store.select(getFilaSeleccionada).subscribe((fila: any) => {

      if (fila) {

        this.store.dispatch(loadRelacionautorizacionesSeleccionado(fila.fila));
      }
    });
    this.subscription$ = this.store.select(getAccionTabla).subscribe((accion: any) => {

      this.store.dispatch(loadRelacionautorizacionesSeleccionado(null));
    });
  }
}
