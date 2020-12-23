export const CONFIGURACION_PRUEBA: any = {
    showColumnTitle: true,
    // title: {
    //     name: 'Actividades Asociadas',
    //     class: 'text-center text-light',
    // },
    dataConfig: [
        {
            key: 'vigencia',
            title: {
                name: 'Vigencia',
                class: 'text-center',
            },
            pipe: {
                class: 'text-justify',
            }
        },
        {
            key: 'consecutivoAnulacion',
            title: {
                name: 'Consecutivo de anulación',
                class: 'text-center',
            },
            pipe: {
                class: 'text-justify',
            }
        },
        {
            key: 'areaFuncional',
            title: {
                name: 'Área funcional',
                class: 'text-center',
            },
            pipe: {
                class: '',
            }
        },
        {
            key: 'tipoDocumento',
            title: {
                name: 'Tipo de documento',
                class: 'text-center',
            },
            pipe: {
                class: '',
            }
        }
    ],
    rowActions: {
        title: {
            name: 'Acciones',
            class: 'text-center',
            actionClass: 'd-flex flex-row justify-content-around align-middle'
        },
        actions: [
            {
                name: 'ver',
                icon: 'fas fa-eye',
                class: 'p-2',
                title: 'Ver Solicitud',
            },
        ],
    },
    tableActions: [
        {
            name: 'nuevo',
            icon: 'fas fa-plus py-1 px-2',
            class: 'px-2',
            title: 'Crear nueva anulación',
        }
    ],
    noData: {
        name: 'No Existen Elementos Asociados',
        class: 'text-center',
    },
    sort: true,
    filter: true,
};
export const DATOS_PRUEBA: any = [
    {
        vigencia: '2020',
        consecutivoAnulacion: '34534',
        areaFuncional: '00/00/00',
        tipoDocumento: 'Orden de pago'
    },
    {
        vigencia: '2019',
        consecutivoAnulacion: '12763',
        areaFuncional: '4/8/2',
        tipoDocumento: 'Relación de autorización'
    },
    {
        vigencia: '2020',
        consecutivoAnulacion: '89347932',
        areaFuncional: '4/5/9',
        tipoDocumento: 'Relación de autorización'
    },
    {
        vigencia: '2020',
        consecutivoAnulacion: '712368',
        areaFuncional: '7/8/9',
        tipoDocumento: 'Orden de pago'
    },
    {
        vigencia: '2018',
        consecutivoAnulacion: '231238',
        areaFuncional: '7/5/9',
        tipoDocumento: 'Relación de autorización'
    },
    {
        vigencia: '2019',
        consecutivoAnulacion: '8345893',
        areaFuncional: '10/10/10',
        tipoDocumento: 'Orden de pago'
    }
];
export const DATOS_RELACION_AUTORIZACION: any = [
    {
        areaFuncional: '2020',
        vigencia: '2019',
        mes: 'febrero',
        consecutivo: '21783',
        estado: 'activo'
    },
    {
        areaFuncional: '2020',
        vigencia: '2019',
        mes: 'junio',
        consecutivo: '18293',
        estado: 'activo'
    },
    {
        areaFuncional: '2020',
        vigencia: '2019',
        mes: 'julio',
        consecutivo: '78231',
        estado: 'activo'
    },
    {
        areaFuncional: '2020',
        vigencia: '2020',
        mes: 'agosto',
        consecutivo: '89273',
        estado: 'activo'
    },
    {
        areaFuncional: '2020',
        vigencia: '2020',
        mes: 'febrero',
        consecutivo: '987123',
        estado: 'activo'
    },
    {
        areaFuncional: '2020',
        vigencia: '2019',
        mes: 'enero',
        consecutivo: '1827',
        estado: 'activo'
    }
];
export const DATOS_ORDENPAGO: any = [
    {
        id: 1,
        vigencia: '2019',
        consecutivo: '21783',
        tipoID  : 'CC',
        numeroID: '120398',
        nombre: 'Ester'
    },
    {
        id: 2,
        vigencia: '2021',
        consecutivo: '2453',
        tipoID  : 'CC',
        numeroID: '87324',
        nombre: 'Juan'
    },
    {
        id: 3,
        vigencia: '2020',
        consecutivo: '21783',
        tipoID  : 'CC',
        numeroID: '379989',
        nombre: 'Lina'
    },
    {
        id: 4,
        vigencia: '2019',
        consecutivo: '21233',
        tipoID  : 'CC',
        numeroID: '5465598',
        nombre: 'Ana'
    },
    {
        id: 5,
        vigencia: '2019',
        consecutivo: '21908',
        tipoID  : 'CC',
        numeroID: '120455',
        nombre: 'Nancy'
    },
];
export const DATOS_VALOR: any = [
    {
        id: 1,
        nConcepto: 'Nómina CPS',
        valor: '3000000',
    }
];
export const DATOS_PRESUPUESTAL: any = [
    {
        id: 1,
        codigo: '111-222-333',
        nombreConcepto: 'Servicios de consultoría',
        valorAplicacion: '$ 3.000.000, 00',
    }
];
