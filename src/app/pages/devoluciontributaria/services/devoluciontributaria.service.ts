import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { RequestManager } from '../../../@core/managers/requestManager';

@Injectable({
    providedIn: 'root'
})
export class DevolucionTributariaService {
    constructor(private rqManager: RequestManager) { }

    public crearDevolucionTributaria(element: any) {
        this.rqManager.setPath('CENTRAL_CUENTAS_CRUD_SERVICE');
        return (this.rqManager.post('devolucion-tributaria/', element)).pipe(map(data => {
            return ((data && data.Data) ? data.Data : data);
        }));
    }

    public actualizarDevolucionTributaria(id: any, element: any) {
        this.rqManager.setPath('CENTRAL_CUENTAS_CRUD_SERVICE');
        return (this.rqManager.put('devolucion-tributaria/', element, id)).pipe(map(data => {
            return ((data && data.Data) ? data.Data : data);
        }));
    }

    public getDevolucionesTributarias(sortby: any, order: any) {
        this.rqManager.setPath('CENTRAL_CUENTAS_CRUD_SERVICE');
        return (this.rqManager.getv2('devolucion-tributaria/', null, null, null, sortby, order, null, null)).pipe(map(data => {
            return ((data && data.Data) ? data.Data : data);
        }));
    }
}
