import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NbGetters, NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { LoadNodoSeleccionadoCuentaContable} from '../../actions/shared.actions';
import { ArbolCuentasContables, DatosNodoCuentaContable } from '../../interfaces/interfaces';
import { getArbolCuentaContable, getNodoSeleccionadoCuentaContable} from '../../selectors/shared.selectors';
import { ParametricService } from '../../services/parametric.service';

@Component({
  selector: 'ngx-arbol-cuentas-contables',
  templateUrl: './arbol-cuentas-contables.component.html',
  styleUrls: ['./arbol-cuentas-contables.component.scss']
})
export class ArbolCuentasContablesComponent implements OnInit, OnDestroy, OnChanges {
  selectedTreeRow: any = null;

  sortColumn: string = '';
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  customColumn = 'Codigo';
  defaultColumns = ['Nombre'];
  allColumns = [this.customColumn, ...this.defaultColumns];

  data: ArbolCuentasContables<DatosNodoCuentaContable>[];
  dataSource: NbTreeGridDataSource<DatosNodoCuentaContable>;
  buscar: string;

  subscriptionCuentaContable$: any;
  subCuentaContableSeleccionada$: any;

  FuenteRecurso$: BehaviorSubject<any>;

  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<DatosNodoCuentaContable>,
    private store: Store<any>,
    private parametric: ParametricService,
    private translate: TranslateService
  ) {
    this.buscar = this.translate.instant('GLOBAL.buscar');
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.FuenteRecurso) {
      this.store.dispatch(LoadNodoSeleccionadoCuentaContable(null));
    }
  }

  ngOnInit() {
    const getters1: NbGetters<ArbolCuentasContables<DatosNodoCuentaContable>, ArbolCuentasContables<DatosNodoCuentaContable>> = {
      dataGetter: (node: ArbolCuentasContables<DatosNodoCuentaContable>) => node.data || null,
      childrenGetter: (node: ArbolCuentasContables<DatosNodoCuentaContable>) => !!node.children && !!node.children.length ? node.children : [],
      expandedGetter: (node: ArbolCuentasContables<DatosNodoCuentaContable>) => !!node.expanded,
    };
    this.parametric.CargarArbolCuentasContables();
    this.subscriptionCuentaContable$ = this.store.select(getArbolCuentaContable).subscribe((accion) => {
      this.data = [];
      if (accion) {
        if (Object.keys(accion).length > 0) {
          delete accion['type'];
          Object.keys(accion).forEach(element => {
            this.data.push(accion[element]);
          });
          this.dataSource = this.dataSourceBuilder.create(this.data, getters1);
        }
      }
    });

    this.subCuentaContableSeleccionada$ = this.store
    .select(getNodoSeleccionadoCuentaContable)
    .subscribe((cuentaContable: any) => {
      if (cuentaContable) {
        if (Object.keys(cuentaContable)[0] !== 'type') {
          if (cuentaContable !== null) {
            this.selectedTreeRow = cuentaContable;
          }
        }
      }
      });
  }

  changeSort(sortRequest: NbSortRequest): void {
    this.dataSource.sort(sortRequest);
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getDirection(column: string): NbSortDirection {
    if (column === this.sortColumn) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  ngOnDestroy(): void {
    this.subscriptionCuentaContable$.unsubscribe();
    this.subCuentaContableSeleccionada$.unsubscribe();
  }

  onSelect(row: any) {
    this.store.dispatch(LoadNodoSeleccionadoCuentaContable(row));
  }

  CargarCuentaContables(Fuente: any, Arbol: any) {
    const ArbolFuenteRecurso = Arbol[0].children.find(
      hijo => hijo.Codigo === Fuente
    );

    return [ArbolFuenteRecurso];
  }
}
