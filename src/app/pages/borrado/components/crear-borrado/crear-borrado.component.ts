import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { cargarDatosCuenta } from '../../actions/borrado.actions';

@Component({
  selector: 'ngx-crear-borrado',
  templateUrl: './crear-borrado.component.html',
  styleUrls: ['./crear-borrado.component.scss']
})
export class CrearBorradoComponent implements OnInit {

  tipoBorrado: any;

  constructor(
    public route: Router,
    private store: Store<any>,
  ) {}

  ngOnInit() {}

  eleccionBorrado (data: any) {
    this.store.dispatch(cargarDatosCuenta(data));
    this.tipoBorrado = data.tipoBorrado;
    if (this.tipoBorrado === 'Orden de pago') {
      this.route.navigateByUrl('/pages/borrado/cuentas/opago');
    } else if (this.tipoBorrado === 'Relación de autorización') {
      this.route.navigateByUrl('/pages/borrado/cuentas/rautorizacion');
    }
  }

}
