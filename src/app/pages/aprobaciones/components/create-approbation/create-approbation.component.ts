import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { getDatosIniciales } from '../../selectors/aprobaciones.selectors';
@Component({
  selector: 'ngx-create-approbation',
  templateUrl: './create-approbation.component.html',
  styleUrls: ['./create-approbation.component.scss']
})
export class CreateApprobationComponent implements OnInit, OnDestroy {

  nombreAprobacion: any;
  subscription$: any;

  constructor(
    private store: Store<any>,
  ) {

   }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  ngOnInit() {
    this.subscription$ = this.store.select(getDatosIniciales).subscribe(data => {
      if (data !== null) {
        this.nombreAprobacion = data.tipoAprobacion;
    }
    });
  }

}
