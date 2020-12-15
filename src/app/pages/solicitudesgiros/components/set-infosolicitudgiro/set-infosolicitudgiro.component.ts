import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';


@Component({
  selector: 'ngx-set-infosolicitudgiro',
  templateUrl: './set-infosolicitudgiro.component.html',
  styleUrls: ['./set-infosolicitudgiro.component.scss']
})
export class SetInfosolicitudgiroComponent implements OnInit {

  infoSolicitudGroup: FormGroup;

  constructor( private fb: FormBuilder ) {
    this.createForm();
  }

  ngOnInit() {

  }

  // Validacion del Formulario
  get conceptoInvalid() {
    return this.infoSolicitudGroup.get('concepto').invalid && this.infoSolicitudGroup.get('concepto').touched;
  }
  get areaInvalid() {
    return this.infoSolicitudGroup.get('areaFuncional').invalid && this.infoSolicitudGroup.get('areaFuncional').touched;
  }
  get tipoIdInvalid() {
    return this.infoSolicitudGroup.get('tipoId').invalid && this.infoSolicitudGroup.get('tipoId').touched;
  }
  get numeroIdInvalid() {
    return this.infoSolicitudGroup.get('numeroId').invalid && this.infoSolicitudGroup.get('numeroId').touched;
  }

  createForm() {
    this.infoSolicitudGroup = this.fb.group({
      concepto: ['', Validators.required],
      numeroSolicitud: ['001', ],
      areaFuncional: ['', Validators.required],
      fechaSolicitud: ['', ],
      tipoId: ['', Validators.required],
      numeroId: ['',
        [Validators.required,
        Validators.pattern('^[0-9]*$')]],
      nombres: ['', ],
      apellidos: ['', ],
      cargo: ['', ],

    });
  }

  saveForm() {
    if ( this.infoSolicitudGroup.invalid ) {
      return Object.values( this.infoSolicitudGroup.controls ).forEach( control => {
        control.markAsTouched();
      });
    }
  }

}
