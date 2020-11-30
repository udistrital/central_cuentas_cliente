import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-set-datosbeneficiario',
  templateUrl: './set-datosbeneficiario.component.html',
  styleUrls: ['./set-datosbeneficiario.component.scss']
})
export class SetDatosbeneficiarioComponent implements OnInit {
  datosBeneficiario: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.datosBeneficiario = this.fb.group({
      numeroOrden: ['',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ],
      ],
      fechaOrden: ['', Validators.required],
      unidadEjecutora: ['', Validators.required],
      tipoId: ['', Validators.required],
      numeroId: ['', Validators.required],
      banco: ['', Validators.required],
      cuenta: ['', [
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ],
      ]
    });
  }

}
