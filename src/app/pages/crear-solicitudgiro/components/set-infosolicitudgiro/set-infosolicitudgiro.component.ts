import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'ngx-set-infosolicitudgiro',
  templateUrl: './set-infosolicitudgiro.component.html',
  styleUrls: ['./set-infosolicitudgiro.component.scss']
})
export class SetInfosolicitudgiroComponent implements OnInit{


  firstFormGroup: FormGroup;

  // requiredField = new FormControl('', [Validators.required]);

  constructor( private _formBuilder: FormBuilder ) {

  }

  // getErrorMessage() {
  //   if (this.requiredField.hasError('required')) {
  //      return 'Este campo es requerido';
  //    }
  //    return this.requiredField.hasError('numId') ? 'No es válido' : '';
  //  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
  }

}
