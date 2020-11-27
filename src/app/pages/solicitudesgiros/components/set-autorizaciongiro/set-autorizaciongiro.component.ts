import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';

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

  createForm() {
    this.autorizacionGroup = this.fb.group({
      tipoId: new FormControl('', [Validators.required]),
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
