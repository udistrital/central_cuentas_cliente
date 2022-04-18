import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, ViewChildren } from '@angular/core';
import {
  NbGetters,
  NbSortDirection,
  NbTreeGridRowComponent,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder,
  NbSortRequest,
} from '@nebular/theme';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { LoadNodoSeleccionadoConcepto } from '../../actions/shared.actions';
import { EstructuraArbolRubrosApropiaciones } from '../../interfaces/interfaces';
import { seleccionarConceptos } from '../../selectors/shared.selectors';
import { FORM_NODO_CONCEPTO } from './form_nodo_concepto';

@Component({
  selector: 'ngx-conceptos',
  templateUrl: './conceptos.component.html',
  styleUrls: ['./conceptos.component.scss']
})
export class ConceptosComponent implements OnInit {

  @Output() ConceptoSeleccionado = new EventEmitter();
  customColumn = 'Codigo';
  defaultColumns = ['Nombre'];
  allColumns = [this.customColumn, ...this.defaultColumns];
  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;
  formData: any;
  nodeData: any;
  conceptos: any;
  subConceptos$: any;
  selectedNodeData: any;
  idHighlight: any;
  oldHighlight: ElementRef;
  dataSource: NbTreeGridDataSource<EstructuraArbolRubrosApropiaciones>;

  constructor(
    private renderer: Renderer2,
    private store: Store<any>,
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<EstructuraArbolRubrosApropiaciones>,
    private translate: TranslateService,
  ) { }

  ngOnInit() {
    this.loadTree();

    this.formData = FORM_NODO_CONCEPTO;
    this.nodeData = undefined;
  }

  async onSelect(selectedItem: any, treegrid) {
    this.idHighlight = treegrid.elementRef.nativeElement.getAttribute('data-picker');
    this.ConceptoSeleccionado.emit(selectedItem.data);
    if (selectedItem.children == null) this.store.dispatch(LoadNodoSeleccionadoConcepto(selectedItem.data));
    this.selectedNodeData = selectedItem.data;
  }

  loadTree() {
    const getters: NbGetters<any, any> = {
      dataGetter: (node: any) => node.data || undefined,
      childrenGetter: (node: any) => !!node.children && !!node.children.length ? node.children : [],
      expandedGetter: (node: any) => !!node.expanded,
    };
    this.customColumn = 'Codigo';
    this.defaultColumns = ['Nombre', 'Activo'];
    this.allColumns = [this.customColumn, ...this.defaultColumns];
    this.subConceptos$ = this.store.select(seleccionarConceptos).subscribe((accion) => {
      if (accion && accion.ConceptosContables) {
        if (accion.ConceptosContables.length) {
          this.conceptos = accion.ConceptosContables;
          this.dataSource = this.dataSourceBuilder.create(this.conceptos, getters);
        }
      }
    });
  }

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + nextColumnStep * index;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  validHighlight(selectedItem: any, treegrid) {
    if (selectedItem.data.Codigo === this.idHighlight) {
      this.updateHighlight(treegrid.elementRef, selectedItem.data);
      return true;
    }
    return false;
  }

  updateHighlight(newHighlight: ElementRef, row) {
    this.oldHighlight && this.renderer.setStyle(this.oldHighlight.nativeElement, 'background', 'white');
    if (row.Codigo === this.idHighlight) {
      this.renderer.setStyle(newHighlight.nativeElement, 'background', 'lightblue');
    }
    this.oldHighlight = newHighlight;
  }
}
