import { Component, OnInit } from '@angular/core';
import { RelacionautorizacionesService, Relacion } from '../../services/relacionautorizaciones.service';

@Component({
  selector: 'ngx-menutiporelacion',
  templateUrl: './menutiporelacion.component.html',
  styleUrls: ['./menutiporelacion.component.scss']
})
export class MenutiporelacionComponent implements OnInit {

  relacion: Relacion[] = [];

  constructor( private _relacionService: RelacionautorizacionesService) { }

  ngOnInit() {

    this.relacion = this._relacionService.getRelacion();
  }

}
