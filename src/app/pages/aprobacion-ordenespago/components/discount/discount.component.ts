import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormService } from '../../../../shared/services/form.service';
import { DATOS_ORDENPRESUPUESTAL } from '../../interfaces/interfaces';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {

  titles: String[] = ['Cuenta', 'Descuento', 'Concepto', 'Valor base de retención', 'Valor'];
  attributes: any[] = [['cuenta'], ['descuento'], ['concepto'], ['valorRetencion'], ['valor']];

  datosDescuentos: any;
  consecutivo: any;

  constructor(public form: FormService,
    private _location: Location,
    private route: Router,
    private routeActived: ActivatedRoute) {
    this.datosDescuentos = DATOS_ORDENPRESUPUESTAL;
  }

  ngOnInit() {
    this.getOrden();
    this.form.rechazarFormulario = false;
  }

  getOrden (): void {
    this.consecutivo = +this.routeActived.snapshot.paramMap.get('id');
  }

  regresar() {
    this._location.back();
  }

  rechazarDescuento() {
    this.form.rechazarFormulario = true;
  }

  aceptarDescuento() {
    Swal.fire({
      type: 'success',
      title: '¡Aprobación exitosa!',
      text: 'Se han aprobado las órdenes de pago. ' + this.consecutivo + ' "Aprobación presupuestal"',
      confirmButtonText: 'Aceptar',
    });
    this._location.back();
  }

}
