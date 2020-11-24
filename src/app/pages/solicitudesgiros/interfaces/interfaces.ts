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
            key: 'numeroSolicitud',
            title: {
                name: 'No. de Solicitud',
                class: 'text-center',
            },
            pipe: {
                class: '',
            }
        },
        {
            key: 'nombreBeneficiario',
            title: {
                name: 'Nombre del Beneficiario',
                class: 'text-center',
            },
            pipe: {
                class: 'text-justify',
            }
        },
        {
            key: 'fecha',
            title: {
                name: 'Fecha',
                class: 'text-center',
            },
            pipe: {
                class: '',
            }
        },
        {
            key: 'estado',
            title: {
                name: 'Estado',
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
                title: 'Ver Solicitud',
            },
        ],
    },
    tableActions: [
        {
            name: 'nuevo',
            icon: 'fas fa-plus py-1 px-2',
            class: 'px-2',
            title: 'Crear Nueva Solicitud',
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
        numeroSolicitud: '1',
        nombreBeneficiario: 'Dalia',
        fecha: '00/00/00',
        estado: 'Elaborado',
    },
    {
        numeroSolicitud: '2',
        nombreBeneficiario: 'Marcela',
        fecha: '00/00/00',
        estado: 'Elaborado',
    },
    {
        numeroSolicitud: '3',
        nombreBeneficiario: 'Muñoz',
        fecha: '00/00/00',
        estado: 'Elaborado',
    },
    {
        numeroSolicitud: '4',
        nombreBeneficiario: 'Araque',
        fecha: '00/00/00',
        estado: 'Elaborado',
    },
    {
        numeroSolicitud: '5',
        nombreBeneficiario: 'Cesar',
        fecha: '00/00/00',
        estado: 'Elaborado',
    },
];
