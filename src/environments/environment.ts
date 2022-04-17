/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
export const environment = {

    production: false,
    CLIENTE_PRESUPUESTO: '/pages/plan-cuentas',
    CLIENTE_CONTABILIDAD: 'https://pruebascontabilidad.portaloas.udistrital.edu.co/pages',
    WSO2_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/',
    PLAN_CUENTAS_MONGO_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/plan_cuentas_mongo_crud/v1/',
    PLAN_CUENTAS_MID_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/plan_cuentas_mid/v1/',
    CUENTAS_CONTABLES_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/cuentas_contables_crud/',
    TERCEROS_CRUD_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/terceros_crud/v1/',
    TERCEROS_MID_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/terceros_mid/v1/',
    CONFIGURACION_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/configuracion_crud_api/v1/',
    CONF_MENU_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/configuracion_crud_api/v1/menu_opcion_padre/ArbolMenus/',
    PARAMETROS_CRUD_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/parametros/',
    DOCUMENTO_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/documento_crud/v2/',
    GESTOR_DOCUMENTAL_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/gestor_documental_mid/v1/',
    CONSECUTIVOS_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/consecutivos_crud/v1/',
    CENTRAL_CUENTAS_CRUD_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/central_cuentas_crud/v1/',
    // CENTRAL_CUENTAS_CRUD_SERVICE: 'http://localhost:3000/',
    ADMINISTRATIVA_AMAZON_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/administrativa_amazon_api/v1/',
    MOVIMIENTOS_ARKA_CRUD_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/movimientos_arka_crud/v1/',
    PLAN_ADQUISICIONES_CRUD_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/plan_adquisiciones_crud/v1/',
    ADMINISTRATIVA_JBPM_CRUD_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/administrativa_jbpm/v2/',
    TOKEN: {
        AUTORIZATION_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oauth2/authorize',
        CLIENTE_ID: 'e36v1MPQk2jbz9KM4SmKhk8Cyw0a',
        RESPONSE_TYPE: 'id_token token',
        SCOPE: 'openid email role',
        REDIRECT_URL: 'http://localhost:4200/',
        SIGN_OUT_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oidc/logout',
        SIGN_OUT_REDIRECT_URL: 'http://localhost:4200/',
    },

};
