import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetArbolRubro } from '../actions/shared.actions';
import { getArbolRubro } from '../selectors/shared.selectors';

@Injectable({
  providedIn: 'root'
})
export class ParametricService {

  constructor(
    private store: Store<any>,
  ) {
  }

  CargarArbolRubros(fuente: any) {
    this.store.select(getArbolRubro).subscribe((arbol: any) => {
      if (Object.keys(arbol).length === 0) {
        this.store.dispatch(GetArbolRubro({ branch: fuente }));
      }
    });
  }
}
