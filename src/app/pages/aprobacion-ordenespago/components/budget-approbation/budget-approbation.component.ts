import { Component, OnInit } from '@angular/core';
import { DATOS_ORDEN_DETALLE} from '../../interfaces/interfaces';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { FormService } from '../../../../shared/services/form.service';
@Component({
  selector: 'ngx-budget-approbation',
  templateUrl: './budget-approbation.component.html',
  styleUrls: ['./budget-approbation.component.scss']
})
export class BudgetApprobationComponent implements OnInit {

  titles: String[] = ['Cód. cuenta contable', 'Vigencia', 'Entidad', 'Unidad', 'Disponibilidad', 'Registro', 'Valor'];
  attributes: any[] = [['codigoCuentaContable'], ['vigencia'], ['entidad'], ['unidad'], ['disponibilidad'], ['registro'], ['valor']];
  datosCreacion: any;
  consecutivo: any;
  rechazarFormulario: any;

  constructor( private route: Router,
    private routeActived: ActivatedRoute,
    public form: FormService) {
    this.datosCreacion = DATOS_ORDEN_DETALLE;
  }

  ngOnInit() {
    this.getOrden();
    this.form.rechazarFormulario = false;
  }

  rechazarAprobacion() {
    this.form.rechazarFormulario = true;
  }

  getOrden (): void {
    this.consecutivo = +this.routeActived.snapshot.paramMap.get('id');
  }

  aceptarAprobacion() {
    Swal.fire({
      type: 'success',
      title: '¡Aprobación exitosa!',
      text: 'Se aprobó la relación de orden de pago con consecutivo' + this.consecutivo,
      confirmButtonText: 'Aceptar',
    });
    this.route.navigateByUrl('pages/aprobaciones/orden/lista');
  }

}
