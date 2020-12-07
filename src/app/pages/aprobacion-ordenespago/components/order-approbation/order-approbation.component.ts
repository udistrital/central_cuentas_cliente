import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { DATOS_ORDENPAGO } from '../../interfaces/interfaces';
/* import { FormService } from '../../services/form.service'; */
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-order-approbation',
  templateUrl: './order-approbation.component.html',
  styleUrls: ['./order-approbation.component.scss']
})
export class OrderApprobationComponent implements OnInit, OnDestroy {

  titles: String[] = ['Vigencia', 'Consecutivo', 'Tipo ID', 'No. ID', 'Nombre'];
  attributes: any[] = [['vigencia'], ['consecutivo'], ['tipoID'], ['numeroID'], ['nombre']];
  datosCreacion: any;
  subscription$: any;
  nAprobacion: any;

  constructor( 
    private router: Router,
    private store: Store<any>,
    ) { 
    this.datosCreacion = DATOS_ORDENPAGO;
  }
  
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  ngOnInit() {
    this.subscription$ = this.store.select(getDatosIniciales).subscribe(data => {
      if (data !== null) {
        this.nAprobacion = data.nAprobacion;
    }
    });
  }

  aprobacionContable(){
    Swal.fire({
      type: 'success',
      title: '¡Aprobación exitosa!',
      text: 'Se han aprobado órdenes de pago. "Aprobación contable" No. de aprobación: '+ this.nAprobacion,
      confirmButtonText: 'Aceptar',
    });
    this.router.navigateByUrl('pages/aprobaciones');
  }

  aprobacionPresupuestal(){
    Swal.fire({
      type: 'success',
      title: '¡Aprobación exitosa!',
      text: 'Se han aprobado  órdenes de pago. "Aprobación presupuestal" No. de aprobación: '+ this.nAprobacion,
      confirmButtonText: 'Aceptar',
    });
    this.router.navigateByUrl('pages/aprobaciones');
  }

}
