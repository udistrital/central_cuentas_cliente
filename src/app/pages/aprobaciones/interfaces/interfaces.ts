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