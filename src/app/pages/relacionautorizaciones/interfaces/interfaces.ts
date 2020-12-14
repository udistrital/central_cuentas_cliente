export const CONFIGURACION_TABLAREGISTROS: any = {
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'NumeroOrdendePago',
            title: {
                name: 'No. Orden de Pago',
                class: 'text-center',
            },
            pipe: {
                class: '',
            }
        },
        {
            key: 'NombreBeneficiaro',
            title: {
                name: 'Nombre del Beneficiario',
                class: 'text-center',
            },
            pipe: {
                class: 'text-justify',
            }
        },
        {
            key: 'FechaCreacion',
            title: {
                name: 'Fecha de Creacion',
                class: 'text-center',
            },
            pipe: {
                type: 'date',
                config: [
                    'shortDate'
                ],
                class: 'text-center',
            }
        },
        {
            key: 'FechaExpedicion',
            title: {
                name: 'Fecha de Expedición',
                class: 'text-center',
            },
            pipe: {
                type: 'date',
                config: [
                    'shortDate'
                ],
                class: 'text-center',
            }
        },
        {
            key: 'Estado',
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
                title: 'Ver Resumen de Solicitud',
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
        NumeroOrdendePago: '001',
        NombreBeneficiaro: 'Juana',
        FechaCreacion: '2020-11-20T02:18:54Z',
        FechaExpedicion: '2020-11-30T02:18:54Z',
        Estado: 'Elaborado',
    },
    {
        NumeroOrdendePago: '012',
        NombreBeneficiaro: 'Juan',
        FechaCreacion: '2020-11-20T02:18:54Z',
        FechaExpedicion: '2020-11-30T02:18:54Z',
        Estado: 'Elaborado',
    },
    {
        NumeroOrdendePago: '002',
        NombreBeneficiaro: 'Alberto',
        FechaCreacion: '2020-11-20T02:18:54Z',
        FechaExpedicion: '2020-11-30T02:18:54Z',
        Estado: 'Elaborado',
    },
    {
        NumeroOrdendePago: '003',
        NombreBeneficiaro: 'Miguel',
        FechaCreacion: '2020-11-20T02:18:54Z',
        FechaExpedicion: '2020-11-30T02:18:54Z',
        Estado: 'Elaborado',
    },
    {
        NumeroOrdendePago: '004',
        NombreBeneficiaro: 'Carlos',
        FechaCreacion: '2020-11-20T02:18:54Z',
        FechaExpedicion: '2020-11-30T02:18:54Z',
        Estado: 'Elaborado',
    }
];
