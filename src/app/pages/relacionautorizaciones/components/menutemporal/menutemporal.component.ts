import { Component, OnInit } from '@angular/core';
import { RelacionautorizacionesService, Relacion } from '../../services/relacionautorizaciones.service';

@Component({
  selector: 'ngx-menutemporal',
  templateUrl: './menutemporal.component.html',
  styleUrls: ['./menutemporal.component.scss']
})
export class MenutemporalComponent implements OnInit {

  relacion: Relacion[] = [];

  constructor( private _relacionService: RelacionautorizacionesService) { }

  ngOnInit() {

    this.relacion = this._relacionService.getRelacion();
  }

}
