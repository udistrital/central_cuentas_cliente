import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-show-resumensolicitudgiro',
  templateUrl: './show-resumensolicitudgiro.component.html',
  styleUrls: ['./show-resumensolicitudgiro.component.scss']
})
export class ShowResumensolicitudgiroComponent implements OnInit {

  resumenSolicitudGroup: FormGroup;

  constructor( private _formBuilder: FormBuilder ) {

  }

  get nombreNoValido() {
    return this.resumenSolicitudGroup.get('concepto').invalid && this.resumenSolicitudGroup.get('concepto').touched;
  }

  ngOnInit() {
   this.resumenSolicitudGroup = this._formBuilder.group({
     concepto: new FormControl('', [Validators.required])
   });
  }

}
