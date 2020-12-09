import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RelacionautorizacionesService {

  private relacion: any[] = [
    {
      nombreRelacion: 'Nómina de Funcionarios',
      descripcionRelacion: 'Autorízase al Pagador, para pagar con cargo al presupuesto de la vigencia 2020 y al PAC del mes correspondiente, la nómina de la entidad UNIVERSIDAD DISTRITAL FRANCISCO JOSE DE CALDAS DE RECTOR, PAGO NÓMINA DOCENTES',
      mesRelacion: 'Diciembre',
      quincenaRelacion: '2'
    },
    {
      nombreRelacion: 'Seguridad Social',
      descripcionRelacion: 'Autorízase al Pagador, para pagar con cargo al presupuesto de la vigencia 2020 y al PAC del mes correspondiente, los aportes de la entidad UNIVERSIDAD DISTRITAL FRANCISCO JOSE DE CALDAS DE RECTOR, PAGO DE APORTES A PENSIÓN, ICBF Y CAJA DE COMPENSACIÓN - EMPLEADOS PÚBLICOS DOCENTES',
      mesRelacion: 'Diciembre',
      cajaRelacion: 'Compensar'
    },
  ];

  constructor() { }

  getRelacion() {
    return this.relacion;
  }

  getTipoRelacion( idx: string ) {
    return this.relacion[idx];
  }

}

export interface Relacion {
  nombreRelacion: string;
  descripcionRelacion: string;
  mesRelacion: string;
  quincenaRelacion?: string;
  cajaRelacion?: string;

}
