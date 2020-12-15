import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'ngx-show-resumensolicitudgiro',
  templateUrl: './show-resumensolicitudgiro.component.html',
  styleUrls: ['./show-resumensolicitudgiro.component.scss']
})
export class ShowResumensolicitudgiroComponent implements OnInit {

  resumenSolicitudGroup: FormGroup;

  constructor( private _formBuilder: FormBuilder ) {

  }

  ngOnInit() {
    this.resumenSolicitudGroup = this._formBuilder.group({
    });
  }

}
