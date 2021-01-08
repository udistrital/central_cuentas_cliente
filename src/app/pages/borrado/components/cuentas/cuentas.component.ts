import { Component, OnInit, OnDestroy } from '@angular/core';
import { DATOS_RELACION_AUTORIZACION, DATOS_ORDENPAGO} from '../../interfaces/interfaces';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FormService } from '../../../../shared/services/form.service';
import { Store } from '@ngrx/store';
import { cargarDatosElegidos, cargarDatosJustificacion } from '../../actions/borrado.actions';

@Component({
  selector: 'ngx-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.scss']
})
export class CuentasComponent implements OnInit, OnDestroy {
  
  borradoForm: boolean = false;

  justificacionBorrado: FormGroup;

  modal: NgbModalRef;

  titlesOrden: String[] = ['Vigencia', 'Consecutivo', 'Tipo ID', 'No. ID', 'Nombre'];
  attributesOrden: any[] = [['vigencia'], ['consecutivo'], ['tipoID'], ['numeroID'], ['nombre']];

  titlesRelacion: String[] = ['Área funcional', 'Vigencia', 'Mes', 'Consecutivo', 'Estado'];
  attributesRelacion: any[] = [['areaFuncional'], ['vigencia'], ['mes'], ['consecutivo'], ['estado']];

  datosOrden: any;
  datosRelacion: any;

  tipoBorrado: any;

  constructor(
    public route: Router,
    private routeActived: ActivatedRoute,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    public form: FormService,
    private store: Store<any>,) {
    this.datosOrden = DATOS_ORDENPAGO;
    this.datosRelacion = DATOS_RELACION_AUTORIZACION;
   }

  ngOnDestroy () {
    if (this.modal !== undefined){
      this.modal.close();
    }
  }

  ngOnInit() {
    this.getTipo ();
    this.form.aprobacionesElegidas = [];
    this.justificacionBorrado = this.formBuilder.group({
      nombreResponsable: ['', Validators.required],
      justificacion: ['', Validators.required],
    });
  }

  getTipo () {
    this.tipoBorrado = this.routeActived.snapshot.paramMap.get('tipo');
  }


  open (content: any) {
    this.store.dispatch(cargarDatosElegidos(this.form.aprobacionesElegidas));
    this.modal = this.modalService.open(content);
  }

  close () {
    this.modal.close();
  }

  crear (data: any) {
    this.store.dispatch(cargarDatosJustificacion(data));
    if (this.tipoBorrado === 'opago') {
      this.route.navigateByUrl('/pages/borrado/detalle/opago');
    } else if (this.tipoBorrado === 'rautorizacion') {
      this.route.navigateByUrl('/pages/borrado/detalle/rautorizacion');
    }
  }

}
