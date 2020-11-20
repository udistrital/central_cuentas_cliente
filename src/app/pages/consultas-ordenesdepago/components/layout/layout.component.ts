import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {


  titulo: any;
  constructor() {
    this.titulo = 'REGISTRO ORDENES DE PAGO';
  }
  ngOnInit() {
  }

}
