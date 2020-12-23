import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DATOS_VALOR } from '../../interfaces/interfaces';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'ngx-detalle-acta',
  templateUrl: './detalle-acta.component.html',
  styleUrls: ['./detalle-acta.component.scss']
})
export class DetalleActaComponent implements OnInit {

  @Output () segundoForm: EventEmitter <any>;

  acta: FormGroup;
  datos: any;
  tipoAnulacion: any;

  titles: String[] = ['Nombre del concepto', 'Valor'];
  attributes: any[] = [['nConcepto'], ['valor']];

  constructor(
    private formBuilder: FormBuilder,
    private routeActived: ActivatedRoute,
    private route: Router,
  ) {
    this.datos = DATOS_VALOR;
    this.segundoForm = new EventEmitter;
  }

  ngOnInit() {
    this.getTipo ();
    this.acta = this.formBuilder.group({
      justificacion: ['', Validators.required],
      nombre: ['', Validators.required],
      cargo: ['', Validators.required],
    });
    this.handleFormChanges();
  }

  getTipo (): void {
    this.tipoAnulacion = this.routeActived.snapshot.paramMap.get('tipo');
  }

  handleFormChanges() {
    this.acta.statusChanges.subscribe(
      (result: any) => {if (result === 'VALID') {
        this.segundoForm.emit(true);
        } else if (result === 'INVALID') {
          this.segundoForm.emit(false);
        }
      }
    );
  }

  onSubmit(data: any) {
    if (this.tipoAnulacion === 'rautorizacion') {
      Swal.fire({
        type: 'success',
        title: '¡Proceso exitoso!',
        text: 'Se ha anulado la relación de autorización con consecutivo',
        confirmButtonText: 'Aceptar',
      });
      this.route.navigateByUrl('/pages/anulaciones/lista');
    }
  }

}
