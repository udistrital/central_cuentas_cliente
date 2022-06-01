import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-table-ordenesdevolucion',
  templateUrl: './table-ordenesdevolucion.component.html',
  styleUrls: ['./table-ordenesdevolucion.component.scss']
})
export class TableOrdenesdevolucionComponent implements OnInit {

  constructor(
    private translate: TranslateService
  ) { }

  ngOnInit() {
  }

}
