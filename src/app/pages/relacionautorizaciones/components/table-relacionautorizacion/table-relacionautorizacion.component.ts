import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAccionTabla, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { loadRelacionautorizacionesSeleccionado } from '../../actions/relacionautorizaciones.actions';
import { CONFIGURACION_TABLAREGISTROS, DATOS_TABLAREGISTROS } from '../../interfaces/interfaces';
import { RelacionautorizacionesService } from '../../services/relacionautorizaciones.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-table-relacionautorizacion',
  templateUrl: './table-relacionautorizacion.component.html',
  styleUrls: ['./table-relacionautorizacion.component.scss']
})
export class TableRelacionautorizacionComponent implements OnInit {

  // Configuracion de datos ejemplo en la tabla
  configuracion: any;
  datosTabla: any;
  subscription$: any;

  @Output() selectedAction: EventEmitter<any>;
  stringBusqueda: string;
  // Variable local para mostrar datos desde servicio
  relacion: any = {};
  id: string;

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
    this.activatedRoute.paramMap.subscribe( params => {
      this.relacion = this._relacionService.getTipoRelacion( params.get('id') );
      this.id = params.get('id');
    });
  }

  ngOnInit() {
    // Tabla
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
