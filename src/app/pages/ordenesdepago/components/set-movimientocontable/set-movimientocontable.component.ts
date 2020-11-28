import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-set-movimientocontable',
  templateUrl: './set-movimientocontable.component.html',
  styleUrls: ['./set-movimientocontable.component.scss']
})
export class SetMovimientocontableComponent implements OnInit {
  movimientoContable: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.movimientoContable = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
  }
}
