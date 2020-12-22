import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-nueva-anulacion',
  templateUrl: './nueva-anulacion.component.html',
  styleUrls: ['./nueva-anulacion.component.scss']
})
export class NuevaAnulacionComponent implements OnInit {

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
