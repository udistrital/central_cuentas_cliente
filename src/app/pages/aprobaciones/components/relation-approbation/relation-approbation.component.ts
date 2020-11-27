import { Component, OnInit, Input } from '@angular/core';
import { DATOS_CREACION } from "../../interfaces/interfaces";

@Component({
  selector: 'ngx-relation-approbation',
  templateUrl: './relation-approbation.component.html',
  styleUrls: ['./relation-approbation.component.scss']
})
export class RelationApprobationComponent implements OnInit {

  @Input() nAprobacion: any;

  titles: String[] = ['Área funcional','Vigencia','Mes','Consecutivo','Estado'];

  attributes: any[] = [['areaFuncional'],['vigencia'],['mes'],['consecutivo'],['estado']];

  datosCreacion: any;
  constructor( ) { 
    this.datosCreacion = DATOS_CREACION;
  }

  ngOnInit() {
  }

}
