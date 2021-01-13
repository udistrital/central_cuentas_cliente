import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SetInfosolicitanteComponent } from '../set-infosolicitante/set-infosolicitante.component';
import { SetInfosolicitudComponent } from '../set-infosolicitud/set-infosolicitud.component';
import { SetAnexosimpuestosComponent } from '../set-anexosimpuestos/set-anexosimpuestos.component';
import { getTipoDevolucion } from '../../selectors/solicitud-devolucion.selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ngx-crear-solicitudes-devolucion',
  templateUrl: './crear-solicitudes-devolucion.component.html',
  styleUrls: ['./crear-solicitudes-devolucion.component.scss']
})
export class CrearSolicitudesDevolucionComponent implements OnInit, OnDestroy {
  @ViewChild(SetInfosolicitudComponent, { static: false }) setInfosolicitudComponent: SetInfosolicitudComponent;
  @ViewChild(SetInfosolicitanteComponent, { static: false }) setInfosolicitanteComponent: SetInfosolicitanteComponent;
  @ViewChild(SetAnexosimpuestosComponent, { static: false }) setAnexosimpuestosComponent: SetAnexosimpuestosComponent;
  subscription: any;
  impuestos: string;

  constructor(private fb: FormBuilder, private store: Store<any>) {
    this.impuestos = '';
  }

  ngOnInit() {
    this.subscription = this.store.select(getTipoDevolucion).subscribe((valor) => {
      if (valor && valor.tipoDevolucion) {
        this.impuestos = valor.tipoDevolucion === 'impuestos' ? 'Impuestos y' : '';
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  get infoSolicitudGroup() {
    return this.setInfosolicitudComponent ? this.setInfosolicitudComponent.datosSolicitud : this.fb.group({});
  }

  get infoSolicitanteGroup() {
    return this.setInfosolicitanteComponent ? this.setInfosolicitanteComponent.datosSolicitante : this.fb.group({});
  }

  get impuestosAnexosGroup() {
    return this.setAnexosimpuestosComponent ? this.setAnexosimpuestosComponent.datosImpuestos : this.fb.group({});
  }

}
