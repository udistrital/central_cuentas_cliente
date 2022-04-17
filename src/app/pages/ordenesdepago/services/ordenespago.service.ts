import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { RequestManager } from '../../../@core/managers/requestManager';
import * as OrdenesPagoActions from '../actions/ordenespago.actions';

@Injectable({
    providedIn: 'root'
})
export class OrdenesPagoService {
    constructor(private rqManager: RequestManager) { }

    public subirOrdenPago(element: any) {
        this.rqManager.setPath('CENTRAL_CUENTAS_CRUD_SERVICE');
        return (this.rqManager.post('orden-pago/', element)).pipe(map(data => {
            return ((data && data.Data) ? data.Data : data);
        }));
    }

    public actualizarAutorizacionGiro(id: string, element: any) {
        this.rqManager.setPath('CENTRAL_CUENTAS_CRUD_SERVICE');
        return (this.rqManager.put('autorizacion-giro/', element, id)).pipe(map(data => {
            return ((data && data.Data) ? data.Data : data);
        }));
    }

    public getOrdenesPago(sortby: any, order: any) {
        this.rqManager.setPath('CENTRAL_CUENTAS_CRUD_SERVICE');
        return (this.rqManager.getv2('orden-pago/', null, null, null, sortby, order, null, null)).pipe(map(data => {
            return ((data && data.Data) ? data.Data : data);
        }));
    }

}
