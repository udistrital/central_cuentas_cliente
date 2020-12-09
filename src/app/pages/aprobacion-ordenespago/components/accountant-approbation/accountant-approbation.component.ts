import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { FormService } from '../../../../shared/services/form.service';
@Component({
  selector: 'ngx-accountant-approbation',
  templateUrl: './accountant-approbation.component.html',
  styleUrls: ['./accountant-approbation.component.scss']
})
export class AccountantApprobationComponent implements OnInit {

  consecutivo: any;
  constructor( private route: Router,
    private routeActived: ActivatedRoute,
    public form: FormService) { }

  ngOnInit() {
    this.getOrden();
    this.form.rechazarFormulario = false;
  }

  getOrden (): void {
    this.consecutivo = +this.routeActived.snapshot.paramMap.get('id');
  }

  rechazarContable() {
    this.form.rechazarFormulario = true;
  }

  aceptarContable() {
    Swal.fire({
      type: 'success',
      title: '¡Aprobación exitosa!',
      text: 'Se han aprobado las órdenes de pago. ' + this.consecutivo + ' "Aprobación presupuestal"',
      confirmButtonText: 'Aceptar',
    });
    this.route.navigateByUrl('pages/aprobaciones/orden/lista');
  }
}
