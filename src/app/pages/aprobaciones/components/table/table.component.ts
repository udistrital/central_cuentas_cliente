import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'ngx-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() titles: String[] = [];
  @Input() attributes:String[] = [];
  @Input() list: any[] = [];

  @Input() seleccion: boolean = false;
  @Input() aprobacionContable: boolean = false;
  @Input() aprobacionPresupuestal: boolean = false;
  @Input() botonAprobarRechazar: boolean = false; 

  
  constructor() { }

  ngOnInit() {
  }

  onClick( row:any ) {
    console.log(row);
  }

  aceptar (){

  }

  rechazar () {
    
  }

}
