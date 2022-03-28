/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
export const environment = {
  production: true,
  NUXEO: {
    PATH: 'https://documental.udistrital.edu.co/nuxeo/',
  },
  CLIENTE_PRESUPUESTO: '/pages/plan-cuentas',
    CLIENTE_CONTABILIDAD: 'https://pruebascontabilidad.portaloas.udistrital.edu.co/pages',
    WSO2_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/',
    PLAN_CUENTAS_MONGO_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/plan_cuentas_mongo_crud/v1/',
    CUENTAS_CONTABLES_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/cuentas_contables_crud/',
    TERCEROS_CRUD_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/terceros_crud/v1/',
    CONFIGURACION_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/configuracion_crud_api/v1/',
    CONF_MENU_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/configuracion_crud_api/v1/menu_opcion_padre/ArbolMenus/',
    PARAMETROS_CRUD_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/parametros/',
    DOCUMENTO_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/documento_crud/v2/',
    GESTOR_DOCUMENTAL_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/gestor_documental_mid/v1/',
    CONSECUTIVOS_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/consecutivos_crud/v1/',
    CENTRAL_CUENTAS_CRUD_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/central_cuentas_crud/v1/',
  TOKEN: {
    AUTORIZATION_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oauth2/authorize',
    CLIENTE_ID: '7Sw7NQC6K139_MahTvwPBzl8JU4a',
    RESPONSE_TYPE: 'id_token token',
    SCOPE: 'openid email role',
    REDIRECT_URL: 'https://pruebascentralcuentas.portaloas.udistrital.edu.co',
    SIGN_OUT_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oidc/logout',
    SIGN_OUT_REDIRECT_URL: 'https://pruebascentralcuentas.portaloas.udistrital.edu.co',
  },

};
