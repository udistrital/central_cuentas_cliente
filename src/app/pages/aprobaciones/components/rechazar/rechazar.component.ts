import { Component, OnInit } from '@angular/core';
import {ViewChild, AfterViewInit} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, Validators} from '@angular/forms';
import { FormService } from '../../services/form.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-rechazar',
  templateUrl: './rechazar.component.html',
  styleUrls: ['./rechazar.component.scss']
})
export class RechazarComponent implements OnInit, AfterViewInit {

  procesoRechazado: any;
  modal: NgbModalRef;
  @ViewChild('modalRecha', {static: false}) modalContenido: any;

  ngAfterViewInit() {
    this.abrir();
  }

  constructor(
    private modalService: NgbModal,
    private form: FormService,
    private formBuilder: FormBuilder,
    private router: Router) {
      this.procesoRechazado = this.formBuilder.group({
        nombreResponsable: ['', Validators.required],
        mensajeRechazo: ['', Validators.required],
      });
    }

  ngOnInit() {

  }

  abrir() {
    this.modal = this.modalService.open(this.modalContenido);
  }

  cerrar () {
    this.modal.close();
    this.form.rechazarFormulario = false;
  }

  rechazar(data: any) {
    Swal.fire({
      type: 'success',
      title: '¡Rechazo exitoso!',
      text: data.nombreResponsable + ' rechazó ' + this.form.aprobacionesElegidas.length + ' relaciones de autorización',
      confirmButtonText: 'Aceptar',
    });
    this.modal.close();
    this.router.navigateByUrl('pages/aprobaciones');
  }
}
