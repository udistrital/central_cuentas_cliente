import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getDatosDevolucion, getDatosAlmacenadosSolicitud } from '../../selectors/devoluciontributaria.selectors';

@Component({
  selector: 'ngx-show-comprobantepago',
  templateUrl: './show-comprobantepago.component.html',
  styleUrls: ['./show-comprobantepago.component.scss']
})
export class ShowComprobantepagoComponent implements OnInit, OnDestroy {

  comprobantepagoGroup: FormGroup;

  subscriptionDatosDevolucion$: any;
  subscriptionDatosAlmacenadosDevolucion$: any;
  datosDevolucion: any;
  datosAlmacenadosDevolucion: any;

  constructor( private fb: FormBuilder,
    private store: Store<any>) {
    this.createForm();
   }

  ngOnDestroy() {

  }

  ngOnInit() {
    this.subscriptionDatosDevolucion$ = this.store.select(getDatosDevolucion).subscribe(
      data => {
        if (data !== null) {
          this.datosDevolucion = data;
        }
      }
    );
    this.subscriptionDatosAlmacenadosDevolucion$ = this.store.select(getDatosAlmacenadosSolicitud).subscribe(
      data => {
        if (data !== null) {
          this.datosAlmacenadosDevolucion = data;
        }
      }
    );
  }
  // Validacion de Formulario
  get observacionInvalid() {
    return this.comprobantepagoGroup.get('observacion').invalid && this.comprobantepagoGroup.get('observacion').touched;
  }
  get nombreAutorizaInvalid() {
    return this.comprobantepagoGroup.get('nombreAutoriza').invalid && this.comprobantepagoGroup.get('nombreAutoriza').touched;
  }

  createForm() {
    this.comprobantepagoGroup = this.fb.group({
      observacion: ['',
      [Validators.required,
      Validators.minLength(5)]],
      nombreAutoriza: ['',
      [Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25)]]
    });
  }

  saveForm() {
    if ( this.comprobantepagoGroup.invalid ) {
      return Object.values( this.comprobantepagoGroup.controls ).forEach( control => {
        control.markAsTouched();
      });
    }
  }

}
