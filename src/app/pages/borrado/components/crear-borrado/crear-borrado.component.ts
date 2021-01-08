import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-crear-borrado',
  templateUrl: './crear-borrado.component.html',
  styleUrls: ['./crear-borrado.component.scss']
})
export class CrearBorradoComponent implements OnInit {

  tipoBorrado: any;

  constructor(
    public route: Router,
  ) {}

  ngOnInit() {}

  eleccionBorrado (data: any) {
    this.tipoBorrado = data.tipoBorrado;
    if (this.tipoBorrado === 'Orden de pago') {
      this.route.navigateByUrl('/pages/borrado/cuentas/opago');
    } else if (this.tipoBorrado === 'Relación de autorización') {
      this.route.navigateByUrl('/pages/borrado/cuentas/rautorizacion');
    }
  }

}
