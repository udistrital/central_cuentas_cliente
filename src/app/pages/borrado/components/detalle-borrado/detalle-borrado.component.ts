import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-detalle-borrado',
  templateUrl: './detalle-borrado.component.html',
  styleUrls: ['./detalle-borrado.component.scss']
})
export class DetalleBorradoComponent implements OnInit {

  tipoBorrado: any;

  constructor(private routeActived: ActivatedRoute,) { }

  ngOnInit() {
    this.getTipo ();
  }

  getTipo () {
    this.tipoBorrado = this.routeActived.snapshot.paramMap.get('tipo');
  }
}
