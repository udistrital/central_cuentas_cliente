import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DATOS_TABLAIMPUESTO, DATOS_TABLABANCOS, CONFIGURACION_TABLAIMPUESTO, CONFIGURACION_TABLABANCOS } from '../../interfaces/interfaces';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ngx-set-contabilizacion',
  templateUrl: './set-contabilizacion.component.html',
  styleUrls: ['./set-contabilizacion.component.scss']
})
export class SetContabilizacionComponent implements OnInit {

  configImpuesto: any;
  datosImpuesto: any;
  configBancos: any;
  datosBancos: any;
  contabilizacionGroup: FormGroup;
  Subtotal: any;
  totalGasto: number;

  constructor( private fb: FormBuilder,
    private store: Store<any>,
     ) {
        // Datos de ejemplo q se muestran en la tabla
        this.datosImpuesto = DATOS_TABLAIMPUESTO;
        this.configImpuesto = CONFIGURACION_TABLAIMPUESTO;
        this.datosBancos = DATOS_TABLABANCOS;
        this.configBancos = CONFIGURACION_TABLABANCOS;
        this.createForm();
        this.totalGasto = 0.00;
   }

  ngOnInit() {
    if (this.configImpuesto.endSubtotal) {
      if (!this.configImpuesto.endSubtotal.last.name) {
        const arraySubtotal: any[] = [];
        this.datosImpuesto.forEach((element: any) => {
          arraySubtotal.push(parseFloat(element[this.configImpuesto.endSubtotal.property]));
        });
        this.Subtotal = arraySubtotal.reduce((accumulator, currentValue) => accumulator + currentValue);
      }
    }
  }

  // Validacion del Formulario
  get bancoInvalid() {
    return this.contabilizacionGroup.get('banco').invalid && this.contabilizacionGroup.get('banco').touched;
  }
  get valorInvalid() {
    return this.contabilizacionGroup.get('valor').invalid && this.contabilizacionGroup.get('valor').touched;
  }

  createForm() {
    this.contabilizacionGroup = this.fb.group({
      concepto: ['Devolución de Estampilla', ],
      banco: ['', Validators.required],
      valor: ['',
        [Validators.required,
        Validators.pattern('^[0-9]*$')]
      ]
    });
  }

  saveForm() {
    if ( this.contabilizacionGroup.invalid ) {
      return Object.values( this.contabilizacionGroup.controls ).forEach( control => {
        control.markAsTouched();
      });
    }
  }

}
