import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RequestManager } from '../../../@core/managers/requestManager';

@Injectable({
    providedIn: 'root'
})
export class OrdenesDevolucionService {
    constructor(private rqManager: RequestManager) { }

    public crearOrdenDevolucion(element: any) {
        this.rqManager.setPath('CENTRAL_CUENTAS_CRUD_SERVICE');
        return (this.rqManager.post('orden-devolucion/', element)).pipe(map(data => {
            return ((data && data.Data) ? data.Data : data);
        }));
    }

    public actualizarOrdenDevolucion(id: string, element: any) {
        this.rqManager.setPath('CENTRAL_CUENTAS_CRUD_SERVICE');
        return (this.rqManager.put('orden-devolucion/', element, id)).pipe(map(data => {
            return ((data && data.Data) ? data.Data : data);
        }));
    }

    public getOrdenesDevolucion(sortby: any, order: any) {
        this.rqManager.setPath('CENTRAL_CUENTAS_CRUD_SERVICE');
        return (this.rqManager.getv2('orden-devolucion/', null, null, null, sortby, order, null, null)).pipe(map(data => {
            return ((data && data.Data) ? data.Data : data);
        }));
    }

}
