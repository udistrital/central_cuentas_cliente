import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-set-impuntuacionpresupuestal',
  templateUrl: './set-impuntuacionpresupuestal.component.html',
  styleUrls: ['./set-impuntuacionpresupuestal.component.scss']
})
export class SetImpuntuacionpresupuestalComponent implements OnInit {
  impuntuacionPresupuestal: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.impuntuacionPresupuestal = this.fb.group({
      firstCtrl: ['', Validators.required]
    });
  }
}
