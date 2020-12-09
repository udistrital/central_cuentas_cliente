import { Component, OnInit, Input} from '@angular/core';
import { FormService } from '../../services/form.service';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() titles: String[] = [];
  @Input() attributes: String[] = [];
  @Input() list: any[] = [];

  @Input() seleccion: boolean = false;
  @Input() aprobacionContable: boolean = false;
  @Input() aprobacionPresupuestal: boolean = false;

  aprobacionesElegidas = [];
  row: any;
  consecutivo: any;

  constructor( private form: FormService,
    private route: Router) { }

  ngOnInit() {
    this.form.aprobacionesElegidas = this.aprobacionesElegidas;
  }

  onClickContable( row: any ) {
    this.consecutivo = row.consecutivo;
    this.route.navigateByUrl('pages/aprobaciones/orden/contable/'+this.consecutivo);
  }

  onClickPresupuestal( row: any ) {
    this.consecutivo = row.consecutivo;
    this.route.navigateByUrl('pages/aprobaciones/orden/presupuestal/' + this.consecutivo);
  }

  seleccionar ( cuenta: any, isChecked: boolean) {
    if (isChecked) {
      this.aprobacionesElegidas.push(cuenta);
      this.form.aprobacionesElegidas = this.aprobacionesElegidas;
    } else {
      const index = this.aprobacionesElegidas.findIndex( dato => dato.value === cuenta.consecutivo);
      this.aprobacionesElegidas.splice(index);
      this.form.aprobacionesElegidas = this.aprobacionesElegidas;
    }
  }
}
