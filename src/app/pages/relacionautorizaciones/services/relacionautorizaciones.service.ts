import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RelacionautorizacionesService {

  private relacion: any[] = [
    {
      nombreRelacion: 'Nómina de Funcionarios',
      DescripcionRelacion: 'Autorízase al Pagador, para pagar con cargo al presupuesto de la vigencia 2020 y al PAC del mes correspondiente, la nómina de la entidad UNIVERSIDAD DISTRITAL FRANCISCO JOSE DE CALDAS DE RECTOR, PAGO NÓMINA DOCENTES',
      MesRelacion: 'Diciembre',
      QuincenaRelacion: '2'
    },
    {
      nombreRelacion: 'Seguridad Social',
      DescripcionRelacion: 'Autorízase al Pagador, para pagar con cargo al presupuesto de la vigencia 2020 y al PAC del mes correspondiente, los aportes de la entidad UNIVERSIDAD DISTRITAL FRANCISCO JOSE DE CALDAS DE RECTOR, PAGO DE APORTES A PENSIÓN, ICBF Y CAJA DE COMPENSACIÓN - EMPLEADOS PÚBLICOS DOCENTES',
      MesRelacion: 'Diciembre',
      CajaCompensacionRelacion: 'Compensar'
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
  DescripcionRelacion: string;
  MesRelacion: string;
  QuincenaRelacion?: string;
  CajaCompensacionRelacion?: string;

}
