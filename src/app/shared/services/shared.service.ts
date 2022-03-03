import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { PopUpManager } from '../../@core/managers/popUpManager';
import { RequestManager } from '../../@core/managers/requestManager';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  behavior: BehaviorSubject<any>;

  constructor(
    private rqManager: RequestManager,
  ) {

    this.behavior = new BehaviorSubject({
      width: window.innerWidth,
      height: window.innerHeight,
      size: this.catchSize(window.innerWidth),
    });

    fromEvent(window, 'resize').pipe(
      map((event: any) => {
        return {
          width: event.target.innerWidth,
          height: event.target.innerHeight,
          size: this.catchSize(event.target.innerWidth),
        };
      }),
    ).subscribe((data) => {
      this.behavior.next(data);
    });
  }

  /**
   * Gets arbol
   *  returns one tree level at once.
   * @param [branch] tree's branch to request info from the API
   * @returns  branch information.
   */
  public getArbol(branch?: string) {
    this.rqManager.setPath('PLAN_CUENTAS_MONGO_SERVICE');
    // this.rqManager.setPath('DUMMY_SERVICE');
    // Set the optional branch for the API request.
    // const unidadEjecutora = 1;
    const params = {
      rama: branch,
    };
    // call request manager for the tree's data.
    return this.rqManager.get(`arbol_rubro/arbol/2`, params);

  }

  /**
   * Gets Conceptos
   * @param [id] Identificador del concepto o vacio para todos los conceptos
   * @returns  Información de conceptos
   */
  public getConceptos(id?: any) {
    this.rqManager.setPath('CUENTAS_CONTABLES_SERVICE');
    id = id ? id : '';
    return this.rqManager.get(`concepto/${id}`);
  }

  /**
   * Gets Conceptos
   * @param query Query para traer conceptos
   * @returns  Información de conceptos
   */
     public getConceptosCentralCuentas(query: any) {
      this.rqManager.setPath('PARAMETROS_CRUD_SERVICE');
      const params = {
        query: query,
      };
      return this.rqManager.getv2(`parametro`, null, query, null, null, null, 0);
    }

  /**
   * Gets TiposID
   * @returns  Tipos de identificacion de terceros
   */

  public getTiposID(activo?: boolean) {
    this.rqManager.setPath('TERCEROS_CRUD_SERVICE');
    let query = '';
    if (activo !== null && activo !== undefined)
      query = `Activo:${activo}`;
    const params = {
      query: query,
    };
    return this.rqManager.get('tipo_documento', params);

  }

  /**
   * Gets DatosIdentificacion
   * @returns  Datos de identificacion de terceros
   */

  public getDatosID(numero?: string, tipo?: number, limit?: number, fields?: string) {
    this.rqManager.setPath('TERCEROS_CRUD_SERVICE');
    let params = {};
    if (tipo) {
      params = {
        query : `Numero:${numero},TipoDocumentoId.Id:${tipo}`,
        limit : limit ? limit : 1,
      };
    } else {
      params = {
        query : `Numero:${numero}`,
        limit : limit ? limit : 1,
      };
    }
    return this.rqManager.get('datos_identificacion', params);
  }

  public getRubro(codigo: string) {
    this.rqManager.setPath('PLAN_CUENTAS_MONGO_SERVICE');
    return this.rqManager.get(`arbol_rubro/arbol/${codigo}`);
  }
  /**
     * Gets Vigencia Actual
     *  returns one tree level at once.
     * @param [offset]
     * @returns  vigencia information.
     */
  public getVigenciaActual(offset?: number) {
    this.rqManager.setPath('PLAN_CUENTAS_MONGO_SERVICE');
    const params = {
      offset,
    };
    let query = '';
    if (offset) {
      query = `?offset=${offset}`;
    }
    return this.rqManager.get(`vigencia/vigencia_actual_area/1${query}`, params);
  }

  /**
   * Gets Vigencias
   * @returns Listado de todas las vigencias
   */
  public getVigencias() {
    this.rqManager.setPath('PLAN_CUENTAS_MONGO_SERVICE');
    return this.rqManager.get('vigencia/vigencias_total');
  }

  public cargarDocumentos(element: any) {
    this.rqManager.setPath('GESTOR_DOCUMENTAL_SERVICE');
    return this.rqManager.post('document/upload', element);
  }

    /**
   * Gets Documentos
   * @param uid uid del documento en nuxeo
   * @returns  Documento
   */
     public getDocumentos(uid: string) {
      this.rqManager.setPath('GESTOR_DOCUMENTAL_SERVICE');
      return this.rqManager.getv2(`document/${uid}`, null, null, null, null, null, 0);
    }

    /**
   * Gets Solicitudes by id
   * @param id id de la solicitud de giro
   * @returns  Documento
   */
     public getSolicitudesById(id: string) {
      this.rqManager.setPath('CENTRAL_CUENTAS_CRUD_SERVICE');
      return this.rqManager.getv2(`autorizacion-giro/${id}`, null, null, null, null, null, 0);
    }

  /**
   * Gets tipos Documentos
   * @param query Query para traer los tipos de documentos para cargar soportes
   * @returns  Información de tipos de documentos para cargar soportes
   */
     public getTiposDocumentos(query: any) {
      this.rqManager.setPath('PARAMETROS_CRUD_SERVICE');
      const params = {
        query: query,
      };
      return this.rqManager.getv2(`parametro`, null, query, null, null, null, 0);
    }

    /**
   * Gets procesos Configuracion
   * @param query Query para traer los procesos de configuracion
   * @returns  Información de procesos de configuracion
   */
     public getProcesoConfiguracion(query: any) {
      this.rqManager.setPath('CONFIGURACION_SERVICE');
      const params = {
        query: query,
      };
      return this.rqManager.getv2(`proceso`, null, query, null, null, null, 0);
    }

    public crearConsecutivo(element: any) {
      this.rqManager.setPath('CONSECUTIVOS_SERVICE');
      return this.rqManager.post('consecutivo', element);
    }

  /**
     * getScreenSize
     * capturar el tamaño de pantalla y el tamaño de bootstrap
     * @returns  <Observable> data of the screen size
     */

  public getScreenSize() {
    return this.behavior.asObservable();
  }

  private catchSize(width: any) {
    switch (true) {
      case (width < 576):
        return 'xs';
      case (width >= 576 && width < 768):
        return 'sm';
      case (width >= 768 && width < 992):
        return 'md';
      case (width >= 992 && width < 1200):
        return 'lg';
      case (width >= 1200):
        return 'xl';
    }
  }
}
