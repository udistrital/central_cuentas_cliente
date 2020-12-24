import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SetInfosolicitudComponent } from '../set-infosolicitud/set-infosolicitud.component';

@Component({
  selector: 'ngx-crear-solicitudes-devolucion',
  templateUrl: './crear-solicitudes-devolucion.component.html',
  styleUrls: ['./crear-solicitudes-devolucion.component.scss']
})
export class CrearSolicitudesDevolucionComponent implements OnInit {
  @ViewChild(SetInfosolicitudComponent, {static: false}) setInfosolicitudComponent: SetInfosolicitudComponent;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  get infoSolicitudGroup() {
    return this.setInfosolicitudComponent ? this.setInfosolicitudComponent.datosSolicitud : this.fb.group({});
  }

}
