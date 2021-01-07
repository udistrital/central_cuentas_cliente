import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { getDatosElegidos, getDatosCuenta, getDatosJustificacion } from '../../selectors/borrado.selectors';
import { DATOS_ORDENPAGO } from '../../interfaces/interfaces';
@Component({
  selector: 'ngx-detalle-borrado',
  templateUrl: './detalle-borrado.component.html',
  styleUrls: ['./detalle-borrado.component.scss']
})
export class DetalleBorradoComponent implements OnInit, OnDestroy {

  titles: String[] = ['Consecutivo', 'No. ID', 'Nombre'];
  attributes: any[] = [['consecutivo'], ['numeroID'], ['nombre']];

  tipoBorrado: any;
  detalle: boolean = false;

  subscriptionDatosCuenta$: any;
  subscriptionOrdenes$: any;
  subscriptionJustificacion$: any;

  cuentasElegidas: any;
  lista: any;
  datosJustificacion: any;
  datosCuenta: any;

  constructor(private routeActived: ActivatedRoute,
    private store: Store<any>,
    ) {
      this.lista = [];
     }

  ngOnDestroy () {
    this.subscriptionDatosCuenta$.unsubscribe();
    this.subscriptionOrdenes$.unsubscribe();
    this.subscriptionJustificacion$.unsubscribe();
  }

  ngOnInit() {
    this.getTipo ();
    this.subscriptionDatosCuenta$ = this.store.select(getDatosCuenta).subscribe(
      data => {
        if (data !== null) {
          this.datosCuenta = data;
        }
      });
    this.subscriptionOrdenes$ = this.store.select(getDatosElegidos).subscribe(
      data => {
        if (data !== null) {
          this.lista.push(data);
          this.cuentasElegidas = this.lista;
        } 
      }
    );
    this.subscriptionJustificacion$ = this.store.select(getDatosJustificacion).subscribe(
      data => {
        if (data !== null) {
          this.datosJustificacion = data;
        }
      }
    );
    console.log(this.cuentasElegidas);
    console.log(DATOS_ORDENPAGO);
  }

  getTipo () {
    this.tipoBorrado = this.routeActived.snapshot.paramMap.get('tipo');
  }

  mostrarDetalle () {
    this.detalle = !this.detalle;
  }
}
