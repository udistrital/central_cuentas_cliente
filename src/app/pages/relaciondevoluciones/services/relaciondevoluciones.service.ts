import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RequestManager } from '../../../@core/managers/requestManager';

@Injectable({
    providedIn: 'root'
})
export class RelacionDevolucionesService {
    constructor(private rqManager: RequestManager) { }

    public crearRelacionDevoluciones(element: any) {
        this.rqManager.setPath('CENTRAL_CUENTAS_CRUD_SERVICE');
        return (this.rqManager.post('relacion-devoluciones/', element)).pipe(map(data => {
            return ((data && data.Data) ? data.Data : data);
        }));
    }

    public actualizarRelacionDevoluciones(id: string, element: any) {
        this.rqManager.setPath('CENTRAL_CUENTAS_CRUD_SERVICE');
        return (this.rqManager.put('relacion-devoluciones/', element, id)).pipe(map(data => {
            return ((data && data.Data) ? data.Data : data);
        }));
    }

    public getOrdenesDevolucion(sortby: any, order: any) {
        this.rqManager.setPath('CENTRAL_CUENTAS_CRUD_SERVICE');
        return (this.rqManager.getv2('orden-devolucion/', null, null, null, sortby, order, null, null)).pipe(map(data => {
            return ((data && data.Data) ? data.Data : data);
        }));
    }

    public getRelacionDevoluciones(sortby: any, order: any) {
        this.rqManager.setPath('CENTRAL_CUENTAS_CRUD_SERVICE');
        return (this.rqManager.getv2('relacion-devoluciones/', null, null, null, sortby, order, null, null)).pipe(map(data => {
            return ((data && data.Data) ? data.Data : data);
        }));
    }

}
