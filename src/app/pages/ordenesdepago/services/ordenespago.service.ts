import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { RequestManager } from '../../../@core/managers/requestManager';

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

    public actualizarOrdenPago(id: string, element: any) {
        this.rqManager.setPath('CENTRAL_CUENTAS_CRUD_SERVICE');
        return (this.rqManager.put('orden-pago/', element, id)).pipe(map(data => {
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
