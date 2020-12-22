export const CONFIGURACION_TABLAREGISTROS: any = {
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'Vigencia',
            title: {
                name: 'Vigencia',
                class: 'text-center',
            },
            pipe: {
                class: '',
            }
        },
        {
            key: 'TipoDevolucion',
            title: {
                name: 'Tipo de Devolución',
                class: 'text-center',
            },
            pipe: {
                class: 'text-justify',
            }
        },
        {
            key: 'AreaFuncional',
            title: {
                name: 'Área Funcional',
                class: 'text-center',
            },
            pipe: {
                class: 'text-center',
            }
        },
        {
            key: 'NumeroDevolucion',
            title: {
                name: 'No. de Devolución',
                class: 'text-center',
            },
            pipe: {
                class: 'text-justify',
            }
        },
        {
            key: 'NumeroSolicitud',
            title: {
                name: 'No. de Solicitud',
                class: 'text-center',
            },
            pipe: {
                class: 'text-justify',
            }
        },
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
                title: 'Ver Resumen de Devolución',
            },
        ],
    },
    noData: {
        name: 'No Existen Elementos Asociados',
        class: 'text-center',
    },
    sort: true,
    filter: true,
};
export const DATOS_TABLAREGISTROS: any = [
    {
        Vigencia: '2020',
        TipoDevolucion: '',
        AreaFuncional: 'Rector',
        NumeroDevolucion: '12345',
        NumeroSolicitud: '67890',
    },
    {
        Vigencia: '2020',
        TipoDevolucion: '',
        AreaFuncional: 'Rector',
        NumeroDevolucion: '12345',
        NumeroSolicitud: '67890',
    },
    {
        Vigencia: '2020',
        TipoDevolucion: '',
        AreaFuncional: 'Rector',
        NumeroDevolucion: '12345',
        NumeroSolicitud: '67890',
    },
    {
        Vigencia: '2020',
        TipoDevolucion: '',
        AreaFuncional: 'Rector',
        NumeroDevolucion: '12345',
        NumeroSolicitud: '67890',
    },
    {
        Vigencia: '2020',
        TipoDevolucion: '',
        AreaFuncional: 'Rector',
        NumeroDevolucion: '12345',
        NumeroSolicitud: '67890',
    }
];
export const CONFIGURACION_CONSULTAOP: any = {
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'codigoPresupuestal',
            title: {
                name: 'Código Presupuestal',
                class: 'text-center',
            },
            pipe: {
                class: '',
            }
        },
        {
            key: 'disponibilidad',
            title: {
                name: 'CDP',
                class: 'text-center',
            },
            pipe: {
                class: 'text-justify',
            }
        },
        {
            key: 'registro',
            title: {
                name: 'RP',
                class: 'text-center',
            },
            pipe: {
                class: 'text-justify',
            }
        },
        {
            key: 'concepto',
            title: {
                name: 'Concepto',
                class: 'text-center',
            },
            pipe: {
                class: 'text-justify',
            }
        },
        {
            key: 'total',
            title: {
                name: 'Total',
                class: 'text-center',
            },
            pipe: {
                class: 'text-justify',
            }
        },
    ],
    rowActions: {
        title: {
            name: 'Acciones',
            class: 'text-center',
            actionClass: 'd-flex flex-row justify-content-around align-middle'
        },
        actions: [
            {
                name: 'BorrarRegistroConsulta',
                icon: 'fas fa-trash-alt',
                class: 'p-2',
                title: 'Borrar',
                idStep: 2
            },
        ],
    },
    noData: {
        name: 'No Existen Elementos Asociados',
        class: 'text-center',
    },
    sort: true,
    filter: false,
};
export const DATOS_CONSULTAOP: any = [
    {
        codigoPresupuestal: '001',
        disponibilidad: '202',
        registro: '202011-20',
        concepto: 'Concepto1',
        total: '$1.000.000',
    },
    {
        codigoPresupuestal: '012',
        disponibilidad: '203',
        registro: '20201-12',
        concepto: 'Concepto2',
        total: '$1.000.000',
    },
    {
        codigoPresupuestal: '002',
        disponibilidad: '302',
        registro: '2020112-02',
        concepto: 'Concepto3',
        total: '$1.000.000',
    }
];