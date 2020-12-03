export const configTable: any = {
    // title: {
    //     name: 'string',
    //     class: 'string',
    // },
    dataConfig: [
        {
            key: 'string',
            title: 'string',
            pipe: {
                functionPipe: () => { },
                class: 'string'
            }
        }
    ],
    rowActions: {
        title: {
            name: 'string',
            class: 'string',
        },
        actions: [
            {
                name: 'string',
                icon: 'string',
                class: 'string',
                title: 'string',
            }
        ],
    },
    tableActions: [
        {
            name: 'string',
            icon: 'string',
            class: 'string',
            title: 'string',
        }
    ],
    noData: {
        name: 'string',
        class: 'string',
    },
    sort: 'boolean',
    filter: 'boolean',
};
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
            key: 'numeroAprobacion',
            title: {
                name: 'No. de aprobación',
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
            title: 'Crear nueva orden',
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
       numeroAprobacion: '34534',
       areaFuncional: '00/00/00',
       tipoDocumento: 'Orden de pago'
   },
   {
        vigencia: '2019',
        numeroAprobacion: '12763',
        areaFuncional: '4/8/2',
        tipoDocumento: 'Relación de autorización'
    },
    {
        vigencia: '2020',
        numeroAprobacion: '89347932',
        areaFuncional: '4/5/9',
        tipoDocumento: 'Relación de autorización'
    },
    {
        vigencia: '2020',
        numeroAprobacion: '712368',
        areaFuncional: '7/8/9',
        tipoDocumento: 'Orden de pago'
    },
    {
        vigencia: '2018',
        numeroAprobacion: '231238',
        areaFuncional: '7/5/9',
        tipoDocumento: 'Relación de autorización'
    },
    {
        vigencia: '2019',
        numeroAprobacion: '8345893',
        areaFuncional: '10/10/10',
        tipoDocumento: 'Orden de pago'
    }];
export const DATOS_CREACION: any = [
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
        vigencia: '2019',
        consecutivo: '21783',
        tipoID  : 'CC',
        numeroID: '120398',
        nombre: 'Ester'
    },
    {
        vigencia: '2021',
        consecutivo: '2453',
        tipoID  : 'CC',
        numeroID: '87324',
        nombre: 'Juan'
     },
     {
        vigencia: '2020',
        consecutivo: '21783',
        tipoID  : 'CC',
        numeroID: '379989',
        nombre: 'Lina'
     },
     {
        vigencia: '2019',
        consecutivo: '21233',
        tipoID  : 'CC',
        numeroID: '5465598',
        nombre: 'Ana'
     },
     {
        vigencia: '2019',
        consecutivo: '21908',
        tipoID  : 'CC',
        numeroID: '120455',
        nombre: 'Nancy'
     },
];
export const DATOS_ORDEN_DETALLE: any = [
    {
        codigoCuentaContable: '123',
        vigencia: '2019',
        entidad  : 'Universidad',
        unidad: 'Tesoreria',
        disponibilidad: 'Si',
        registro: '123',
        valor: '139473'
    },
    {
        codigoCuentaContable: '2743',
        vigencia: '2020',
        entidad  : 'Otra',
        unidad: 'Contable',
        disponibilidad: 'Si',
        registro: '5534',
        valor: '829374'
     },
     {
        codigoCuentaContable: '7656',
        vigencia: '2018',
        entidad  : 'Hotel',
        unidad: 'Extension',
        disponibilidad: 'No',
        registro: '534',
        valor: '131231'
     },
     {
        codigoCuentaContable: '123',
        vigencia: '2020',
        entidad  : 'Colegio',
        unidad: 'Tesoreria',
        disponibilidad: 'Si',
        registro: '4234',
        valor: '434234'
     },
     {
        codigoCuentaContable: '123',
        vigencia: '2019',
        entidad  : 'Distrital',
        unidad: 'Otro',
        disponibilidad: 'Si',
        registro: '4534',
        valor: '123123'
     },
];

