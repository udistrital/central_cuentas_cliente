import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-set-autorizaciongiro',
  templateUrl: './set-autorizaciongiro.component.html',
  styleUrls: ['./set-autorizaciongiro.component.scss']
})
export class SetAutorizaciongiroComponent implements OnInit {

  autorizacionGroup: FormGroup;

  constructor( private _formBuilder: FormBuilder ) { }

  ngOnInit() {
    this.autorizacionGroup = this._formBuilder.group({
      concepto: new FormControl('', [Validators.required]),
      tipoId: ['', Validators.required],
      numId: ['', Validators.required]
    });
  }

}
