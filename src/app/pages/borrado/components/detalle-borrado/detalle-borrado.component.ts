import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { getDatosElegidos, getDatosCuenta, getDatosJustificacion } from '../../selectors/borrado.selectors';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { DATOS_ORDENPAGO } from '../../interfaces/interfaces';
@Component({
  selector: 'ngx-detalle-borrado',
  templateUrl: './detalle-borrado.component.html',
  styleUrls: ['./detalle-borrado.component.scss']
})
export class DetalleBorradoComponent implements OnInit, OnDestroy {

  titles: String[];
  attributes: any[];

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
    private location: Location,
    private route: Router
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
    if (this.tipoBorrado == 'opago') {
      this.titles = ['Consecutivo', 'No. ID', 'Nombre'];
      this.attributes = [['consecutivo'], ['numeroID'], ['nombre']];
    } else if ( this.tipoBorrado == 'rautorizacion' ) {
      this.titles = ['Consecutivo', 'Vigencia', 'Mes'];
      this.attributes = [['consecutivo'], ['vigencia'], ['mes']];
    }
    this.subscriptionDatosCuenta$ = this.store.select(getDatosCuenta).subscribe(
      data => {
        if (data !== null) {
          this.datosCuenta = data;
        }
      });
    this.subscriptionOrdenes$ = this.store.select(getDatosElegidos).subscribe(
      data => {
        if (data !== null) {
          let i = 0;
          while (data[i] !== undefined) {
            this.lista.push(data[i]);
            i++;
          };
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
  }

  getTipo () {
    this.tipoBorrado = this.routeActived.snapshot.paramMap.get('tipo');
  }

  mostrarDetalle () {
    this.detalle = !this.detalle;
  }

  retornar () {
    this.location.back();
  }

  borrar () {
    if ( this.tipoBorrado == 'rautorizacion'){
      Swal.fire({
        type: 'success',
        title: '¡Proceso exitoso!',
        text: 'Se ha borrado la relación de autorización con consecutivo',
        confirmButtonText: 'Aceptar',
      });
    } else if ( this.tipoBorrado == 'opago') {
      Swal.fire({
        type: 'success',
        title: '¡Proceso exitoso!',
        text: 'Se ha borrado la órden de pago con consecutivo',
        confirmButtonText: 'Aceptar',
      });
    }
    this.route.navigateByUrl('/pages/borrado/lista');
  }
}
