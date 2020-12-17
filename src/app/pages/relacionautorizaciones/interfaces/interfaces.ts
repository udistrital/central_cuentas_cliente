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

export const CONFIGURACION_TABLACONSULTA: any = {
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
                name: 'Borrar',
                icon: 'fas fa-trash-alt',
                class: 'p-2',
                title: 'Borrar',
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
export const DATOS_TABLACONSULTA: any = [
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

export const CONFIGURACION_TABLACONCEPTOS: any = {
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'codigo',
            title: {
                name: 'Código',
                class: 'text-center',
            },
            pipe: {
                class: '',
            }
        },
        {
            key: 'nombreCentro',
            title: {
                name: 'Nombre Centro de Costos',
                class: 'text-center',
            },
            pipe: {
                class: 'text-justify',
            }
        },
        {
            key: 'valor',
            title: {
                name: 'Valor',
                class: 'text-center',
            },
            pipe: {
                class: 'text-justify',
            }
        },
    ],
    rowActions: {
        title: {
            name: 'Ver Desagregación',
            class: 'text-center',
            actionClass: 'd-flex flex-row justify-content-around align-middle'
        },
        actions: [
            {
                name: 'ver',
                icon: 'fas fa-eye',
                class: 'p-2',
                title: 'Ver Desagregación',
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
export const DATOS_TABLACONCEPTOS: any = [
    {
        codigo: '001',
        nombreCentro: 'Aportes',
        valor: '$1.000.000',
    },
    {
        codigo: '002',
        nombreCentro: 'AportesNomina',
        valor: '$1.000.000',
    },
    {
        codigo: '003',
        nombreCentro: 'Aportessalud',
        valor: '$1.000.000',
    }
];
