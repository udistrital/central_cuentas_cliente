import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { DATOS_CREACION } from '../../interfaces/interfaces';
import { getDatosIniciales } from '../../selectors/aprobaciones.selectors';
import { FormService } from '../../../../shared/services/form.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-relation-approbation',
  templateUrl: './relation-approbation.component.html',
  styleUrls: ['./relation-approbation.component.scss']
})
export class RelationApprobationComponent implements OnInit, OnDestroy {

  datosForm: any;
  titles: String[] = ['Área funcional', 'Vigencia', 'Mes', 'Consecutivo', 'Estado'];
  attributes: any[] = [['areaFuncional'], ['vigencia'], ['mes'], ['consecutivo'], ['estado']];
  datosCreacion: any;
  subscription$: any;

  constructor(
    private store: Store<any>,
    public form: FormService,
    private router: Router
  ) {
    this.datosCreacion = DATOS_CREACION;
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  ngOnInit() {
    this.form.rechazarFormulario = false;
    this.subscription$ = this.store.select(getDatosIniciales).subscribe(data => {
      if (data !== null) {
        this.datosForm = data;
    }
    });
  }

  rechazarAprobacion () {
    this.form.rechazarFormulario = true;
  }

  aceptarAprobacion () {
    Swal.fire({
      type: 'success',
      title: '¡Aprobación exitosa!',
      text: 'Se han aprobado ' + this.form.aprobacionesElegidas.length + ' relaciones de autorización No. de aprobación ',
      confirmButtonText: 'Aceptar',
    });
    this.router.navigateByUrl('pages/aprobaciones');
  }
}
