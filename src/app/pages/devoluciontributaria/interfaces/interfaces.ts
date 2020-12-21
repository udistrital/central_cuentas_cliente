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
