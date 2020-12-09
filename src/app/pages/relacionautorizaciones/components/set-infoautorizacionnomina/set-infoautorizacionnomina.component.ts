import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';


@Component({
  selector: 'ngx-set-infoautorizacionnomina',
  templateUrl: './set-infoautorizacionnomina.component.html',
  styleUrls: ['./set-infoautorizacionnomina.component.scss']
})
export class SetInfoautorizacionnominaComponent {

  infoautorizacionGroup: FormGroup;

  // Variable local para mostrar datos desde servicio
  relacion: any = {};


  constructor( private fb: FormBuilder,

     ) {
    this.createForm();
  }


  // Validacion del Formulario
  get fechaInvalid() {
    return this.infoautorizacionGroup.get('fechaRelacion').invalid && this.infoautorizacionGroup.get('fechaRelacion').touched;
  }
  get mesInvalid() {
    return this.infoautorizacionGroup.get('mes').invalid && this.infoautorizacionGroup.get('mes').touched;
  }
  get quincenaInvalid() {
    return this.infoautorizacionGroup.get('quincena').invalid && this.infoautorizacionGroup.get('quincena').touched;
  }
  get numeroCompromisoInvalid() {
    return this.infoautorizacionGroup.get('numeroCompromiso').invalid && this.infoautorizacionGroup.get('numeroCompromiso').touched;
  }

  createForm() {
    this.infoautorizacionGroup = this.fb.group({
      numeroRelacion: ['001', ],
      fechaRelacion: ['', Validators.required],
      mes: ['', Validators.required],
      quincena: ['',
      [Validators.required,
        Validators.pattern('^[0-9]*$')]],
      numeroCompromiso: ['', Validators.required],
      tipoCompromiso: ['', ],
    });
  }

  saveForm() {
    if ( this.infoautorizacionGroup.invalid ) {
      return Object.values( this.infoautorizacionGroup.controls ).forEach( control => {
        control.markAsTouched();
      });
    }
  }

}
