import { Injectable } from '@angular/core';
import { RequestManager } from '../../../@core/managers/requestManager';

@Injectable({
    providedIn: 'root'
})
export class SolicitudesGirosService {
    constructor(private rqManager: RequestManager) { }

    public subirAutorizacionGiro(element: any) {
        this.rqManager.setPath('CENTRAL_CUENTAS_CRUD_SERVICE');
        return this.rqManager.post('autorizacion-giro/', element);
    }

    public actualizarAutorizacionGiro(id: string, element: any) {
        this.rqManager.setPath('CENTRAL_CUENTAS_CRUD_SERVICE');
        return this.rqManager.put('autorizacion-giro/', element, id);
    }

    public getAutorizacionGiro() {
        this.rqManager.setPath('CENTRAL_CUENTAS_CRUD_SERVICE');
        return this.rqManager.getv2('autorizacion-giro/', null, null, null, null, null, null, null);
    }

}
