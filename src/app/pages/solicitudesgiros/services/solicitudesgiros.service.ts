import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RequestManager } from '../../../@core/managers/requestManager';
import * as SolicitudesgirosActions from '../actions/solicitudesgiros.actions';

@Injectable({
    providedIn: 'root'
})
export class SolicitudesGirosService {
    constructor(private rqManager: RequestManager) { }

    public subirAutorizacionGiro(element: any) {
        this.rqManager.setPath('CENTRAL_CUENTAS_CRUD_SERVICE');
        return (this.rqManager.post('autorizacion-giro/', element)).pipe(map(data => {
            return ((data && data.Data) ? data.Data : data)
        }));
    }

    public actualizarAutorizacionGiro(id: string, element: any) {
        this.rqManager.setPath('CENTRAL_CUENTAS_CRUD_SERVICE');
        return (this.rqManager.put('autorizacion-giro/', element, id)).pipe(map(data => {
            return ((data && data.Data) ? data.Data : data)
        }));
    }

    public getAutorizacionGiro(sortby: any, order: any) {
        this.rqManager.setPath('CENTRAL_CUENTAS_CRUD_SERVICE');
        return (this.rqManager.getv2('autorizacion-giro/', null, null, null, sortby, order, null, null)).pipe(map(data => {
            return ((data && data.Data) ? data.Data : data)
        }))
    }

}
