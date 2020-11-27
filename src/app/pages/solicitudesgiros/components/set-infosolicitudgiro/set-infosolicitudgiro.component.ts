import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';


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

  createForm() {
    this.infoSolicitudGroup = this.fb.group({
      concepto: ['', Validators.required],
      numeroSolicitud: ['', ],
      areaFuncional: ['', Validators.required],
      fechaSolicitud: ['', ],
      tipoId: ['', Validators.required],
      numeroId: ['', Validators.required],
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
