import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SetInfosolicitanteComponent } from '../set-infosolicitante/set-infosolicitante.component';
import { SetInfosolicitudComponent } from '../set-infosolicitud/set-infosolicitud.component';

@Component({
  selector: 'ngx-crear-solicitudes-devolucion',
  templateUrl: './crear-solicitudes-devolucion.component.html',
  styleUrls: ['./crear-solicitudes-devolucion.component.scss']
})
export class CrearSolicitudesDevolucionComponent implements OnInit {
  @ViewChild(SetInfosolicitudComponent, {static: false}) setInfosolicitudComponent: SetInfosolicitudComponent;
  @ViewChild(SetInfosolicitanteComponent, {static: false}) setInfosolicitanteComponent: SetInfosolicitanteComponent;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  get infoSolicitudGroup() {
    return this.setInfosolicitudComponent ? this.setInfosolicitudComponent.datosSolicitud : this.fb.group({});
  }

  get infoSolicitanteGroup() {
    return this.setInfosolicitanteComponent ? this.setInfosolicitanteComponent.datosSolicitante : this.fb.group({});
  }

}
