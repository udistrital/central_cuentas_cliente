import { Component, OnInit, OnDestroy } from '@angular/core';
import { DATOS_RELACION_AUTORIZACION, DATOS_ORDENPAGO} from '../../interfaces/interfaces';
import { FormService } from '../../../../shared/services/form.service';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
@Component({
  selector: 'ngx-crear-borrado',
  templateUrl: './crear-borrado.component.html',
  styleUrls: ['./crear-borrado.component.scss']
})
export class CrearBorradoComponent implements OnInit, OnDestroy {

  tipoBorrado: any;
  borradoForm: boolean = false;

  datosOrden: any;
  datosRelacion: any;

  titlesOrden: String[] = ['Vigencia', 'Consecutivo', 'Tipo ID', 'No. ID', 'Nombre'];
  attributesOrden: any[] = [['vigencia'], ['consecutivo'], ['tipoID'], ['numeroID'], ['nombre']];

  titlesRelacion: String[] = ['Área funcional', 'Vigencia', 'Mes', 'Consecutivo', 'Estado'];
  attributesRelacion: any[] = [['areaFuncional'], ['vigencia'], ['mes'], ['consecutivo'], ['estado']];

  justificacionBorrado: FormGroup;

  modal: NgbModalRef;

  constructor(
    public form: FormService,
    public route: Router,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {
    this.datosOrden = DATOS_ORDENPAGO;
    this.datosRelacion = DATOS_RELACION_AUTORIZACION;
   }

  ngOnDestroy () {
    this.modal.close();
  }

  open (content: any) {
    this.modal = this.modalService.open(content);
  }

  close () {
    this.modal.close();
  }

  ngOnInit() {
    this.form.aprobacionesElegidas = [];
    this.justificacionBorrado = this.formBuilder.group({
      nombreResponsable: ['', Validators.required],
      justificacion: ['', Validators.required],
    });
  }

  eleccionBorrado (data: any) {
    this.tipoBorrado = data.tipoBorrado;
  }

  validarForm (data: any) {
    this.borradoForm = data;
  }

  crear (data: any) {
    if (this.tipoBorrado === 'Orden de pago') {
      this.route.navigateByUrl('/pages/borrado/detalle/opago');
    } else if (this.tipoBorrado === 'Relación de autorización') {
      this.route.navigateByUrl('/pages/borrado/detalle/rautorizacion');
    }
  }

}
