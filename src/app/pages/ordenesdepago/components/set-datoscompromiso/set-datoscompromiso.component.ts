import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-set-datoscompromiso',
  templateUrl: './set-datoscompromiso.component.html',
  styleUrls: ['./set-datoscompromiso.component.scss']
})
export class SetDatoscompromisoComponent implements OnInit {
  datosCompromiso: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.datosCompromiso = this.fb.group({
      compromiso: ['', Validators.required],
      numeroCompromiso: ['', [
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ]],
      interventor: ['', Validators.required],
      numeroActa: ['', [
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ]],
      numeroEntradaAlmacen: ['', [
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ]],
      vigencia: ['', Validators.required],
      tipoOrden: ['', Validators.required],
    });
  }
}
