import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getNodoSeleccionado } from '../../../../shared/selectors/shared.selectors';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-set-autorizaciongiro',
  templateUrl: './set-autorizaciongiro.component.html',
  styleUrls: ['./set-autorizaciongiro.component.scss']
})
export class SetAutorizaciongiroComponent implements OnInit {

  autorizacionGroup: FormGroup;

  subscription$: any;

  constructor( private fb: FormBuilder, private store: Store<any> ) {

   this.createForm();
   }

  ngOnInit() {

  // Seleccionar Rubro
  this.subscription$ = this.store.select(getNodoSeleccionado).subscribe((nodo: any) => {

    if (nodo) {
      if (Object.keys(nodo)[0] === 'type') {
        // hay que crear un delay porque el cambio se efectua antes de renderizar la vista
        setTimeout(() => {
          this.autorizacionGroup.get('rubroSeleccionado').setValue(null);
        });
      } else {
        if (!nodo.children) {
          this.autorizacionGroup.get('rubroSeleccionado').setValue(nodo);
        }
      }
    }
  });

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
  get valorLetrasInvalid() {
    return this.autorizacionGroup.get('valorLetras').invalid && this.autorizacionGroup.get('valorLetras').touched;
  }
  get valorNumeroInvalid() {
    return this.autorizacionGroup.get('valorNumero').invalid && this.autorizacionGroup.get('valorNumero').touched;
  }

  createForm() {
    this.autorizacionGroup = this.fb.group({
      tipoId: ['', Validators.required],
      numeroId: ['',
        [Validators.required,
        Validators.pattern('^[0-9]*$')]
      ],
      nombreBeneficiario: ['', ],
      rubroSeleccionado: [null, [Validators.required]],
      valorLetras: ['',
        Validators.pattern('^[a-zA-Z]*$')
      ],
      valorNumero: ['',
        [Validators.required,
        Validators.pattern('^[0-9]*$')]
      ]
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
