import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'ngx-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Output() aceptarAprobacionAny = new EventEmitter<string>();
  @Output() rechazarAprobacionAny = new EventEmitter<string>(); 

  @Input() titles: String[] = [];
  @Input() attributes:String[] = [];
  @Input() list: any[] = [];

  @Input() seleccion: boolean = false;
  @Input() aprobacionContable: boolean = false;
  @Input() aprobacionPresupuestal: boolean = false;
  @Input() botonAprobarRechazar: boolean = false; 

  aprobacionesElegidas = [];

  constructor() { }

  ngOnInit() {
  }

  onClick( row:any ) {
    console.log(row);
  }

  seleccionar ( cuenta: any, isChecked: boolean){
    if (isChecked){
      this.aprobacionesElegidas.push(cuenta);
    } else{
      const index = this.aprobacionesElegidas.findIndex( dato => dato.value === cuenta.consecutivo);
      this.aprobacionesElegidas.splice(index);
    }
  }

  aceptarAprobacion (){
    this.aceptarAprobacionAny.emit();
  }

  rechazarAprobacion(){
    this.rechazarAprobacionAny.emit();
    /* this.rechazarFormulario= true; */
  } 

}
