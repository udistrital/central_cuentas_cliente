export const CONFIGURACION_TABLA_SOLICITUDES: any = {
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'vigencia',
            title: {
                name: 'Vigencia',
                class: 'text-center',
            },
            pipe: {
                class: '',
            }
        },
        {
            key: 'numeroSolicitud',
            title: {
                name: 'Número de solicitud',
                class: 'text-center',
            },
            pipe: {
                class: 'text-center',
            }
        },
        {
            key: 'numeroDevolucion',
            title: {
                name: 'Número de Devolución',
                class: 'text-center',
            },
            pipe: {
                class: 'text-center',
            }
        },
        {
            key: 'areaFuncional',
            title: {
                name: 'Área Funcional',
                class: 'text-center',
            },
            pipe: {
                class: 'text-center',
            }
        },
        {
            key: 'tipoDevolucion',
            title: {
                name: 'Tipo de Devolución',
                class: 'text-center',
            },
            pipe: {
                class: 'text-center',
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
                title: 'Ver Solicitud',
            }
        ],
    },
    noData: {
        name: 'No existen elementos asociados',
        class: 'text-center',
    },
    sort: true,
    filter: true,
};
export const DATOS_TABLA_SOLICITUDES: any = [
    {
        vigencia: '000',
        numeroSolicitud: '',
        numeroDevolucion: '',
        areaFuncional: '',
        tipoDevolucion: 'Orden de Pago',
    },
    {
        vigencia: '000',
        numeroSolicitud: '',
        numeroDevolucion: '',
        areaFuncional: '',
        tipoDevolucion: 'Relación de Autorización',
    },
    { vigencia: '000', numeroSolicitud: '', numeroDevolucion: '', areaFuncional: '', tipoDevolucion: '', },
    { vigencia: '000', numeroSolicitud: '', numeroDevolucion: '', areaFuncional: '', tipoDevolucion: '', },
    { vigencia: '000', numeroSolicitud: '', numeroDevolucion: '', areaFuncional: '', tipoDevolucion: '', },
    { vigencia: '000', numeroSolicitud: '', numeroDevolucion: '', areaFuncional: '', tipoDevolucion: '', },
];
