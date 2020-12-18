import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnyFn } from '@ngrx/store/src/selector';

@Component({
  selector: 'ngx-order-anulation',
  templateUrl: './order-anulation.component.html',
  styleUrls: ['./order-anulation.component.scss']
})
export class OrderAnulationComponent implements OnInit {

  tipoAnulacion: any;
  primerForm: boolean = false;
  segundoForm: boolean = false;

  constructor(
    private routeActived: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getTipo ();
  }

  getTipo (): void {
    this.tipoAnulacion = this.routeActived.snapshot.paramMap.get('tipo');
  }

  validarPrimerForm (data: any) {
    this.primerForm = data;
  }

  validarSegundoForm (data: any) {
    this.segundoForm = data;
  }

}
