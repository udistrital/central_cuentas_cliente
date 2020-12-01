import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-set-autorizaciongiro',
  templateUrl: './set-autorizaciongiro.component.html',
  styleUrls: ['./set-autorizaciongiro.component.scss']
})
export class SetAutorizaciongiroComponent implements OnInit {

  autorizacionGroup: FormGroup;

  constructor( private fb: FormBuilder ) {
    this.createForm();
   }

  ngOnInit() {

  }

  // Validacion del Formulario
  get tipoIdInvalid() {
    return this.autorizacionGroup.get('tipoId').invalid && this.autorizacionGroup.get('tipoId').touched;
  }
  get numeroIdInvalid() {
    return this.autorizacionGroup.get('numeroId').invalid && this.autorizacionGroup.get('numeroId').touched;
  }
  get rubroInvalid() {
    return this.autorizacionGroup.get('codigoRubro').invalid && this.autorizacionGroup.get('codigoRubro').touched;
  }
  get valorInvalid() {
    return this.autorizacionGroup.get('valorNumero').invalid && this.autorizacionGroup.get('valorNumero').touched;
  }

  createForm() {
    this.autorizacionGroup = this.fb.group({
      tipoId: ['', Validators.required],
      numeroId: ['', Validators.required],
      nombreBeneficiario: ['', ],
      codigoRubro: ['', Validators.required],
      nombreRubro: ['', ],
      valorLetras: ['', ],
      valorNumero: ['', Validators.required]
    });

  }

  saveForm() {
    if ( this.autorizacionGroup.invalid ) {
      return Object.values( this.autorizacionGroup.controls ).forEach( control => {
        control.markAsTouched();
      });
    }
  }

}
