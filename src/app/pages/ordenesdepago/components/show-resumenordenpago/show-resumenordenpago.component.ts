import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-show-resumenordenpago',
  templateUrl: './show-resumenordenpago.component.html',
  styleUrls: ['./show-resumenordenpago.component.scss']
})
export class ShowResumenordenpagoComponent implements OnInit {
  resumen: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.resumen = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
  }
}
