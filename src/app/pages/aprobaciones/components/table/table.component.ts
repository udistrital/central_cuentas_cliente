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

  @Input() eye: boolean = false;
  @Input() checkbox: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
