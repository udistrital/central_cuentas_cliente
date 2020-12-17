import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-order-anulation',
  templateUrl: './order-anulation.component.html',
  styleUrls: ['./order-anulation.component.scss']
})
export class OrderAnulationComponent implements OnInit {

  tipoAnulacion: any;
  primerFiltro: boolean = false;

  constructor(
    private routeActived: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getTipo ();
  }

  getTipo (): void {
    this.tipoAnulacion = this.routeActived.snapshot.paramMap.get('tipo');
  }

}
