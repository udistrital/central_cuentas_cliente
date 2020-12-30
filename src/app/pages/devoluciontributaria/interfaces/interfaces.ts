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
    checkElement: {
        title: 'string', // column title
        pipe: {
            type: 'string', // date, currency, decimal, percent, custom ( optional )
            config: [
                'string', // array like pipe, no custom
                () => { }, // only custom pipe
            ], //  ( optional )
            class: 'string', // bootstrap class
        }
    },
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
            key: 'consecutivo',
            title: {
                name: 'Consecutivo',
                class: 'text-center',
            },
            pipe: {
                class: 'text-justify',
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
            key: 'documentoId',
            title: {
                name: 'Documento ID',
                class: 'text-center',
            },
            pipe: {
                class: 'text-justify',
            }
        },
        {
            key: 'nombreBeneficiario',
            title: {
                name: 'Beneficiario',
                class: 'text-center',
            },
            pipe: {
                class: 'text-justify',
            }
        },
        {
            key: 'total',
            title: {
                name: 'Valor Total',
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
                name: 'verOrden',
                icon: 'fas fa-eye',
                class: 'p-2',
                title: 'Ver Orden de Pago',
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
export const DATOS_CONSULTAOP: any = [
    {
        vigencia: '001',
        consecutivo: '202',
        disponibilidad: '202011-23',
        registro: '326589',
        documentoId: '4587963',
        nombreBeneficiario: 'William',
        total: '$1.000.000',
    },
    {
        vigencia: '010',
        consecutivo: '220',
        disponibilidad: '202011-20',
        registro: '748596',
        documentoId: '4569324',
        nombreBeneficiario: 'Andres',
        total: '$1.000.000',
    },
    {
        vigencia: '100',
        consecutivo: '22',
        disponibilidad: '202011-10',
        registro: '125487',
        documentoId: '1245639',
        nombreBeneficiario: 'Carlos',
        total: '$1.000.000',
    }
];
export const CONFIGURACION_TABLAIMPUESTO: any = {
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'tercero',
            title: {
                name: 'Tercero',
                class: 'text-center',
            },
            pipe: {
                class: '',
            }
        },
        {
            key: 'numeroCuenta',
            title: {
                name: 'No. de Cuenta',
                class: 'text-center',
            },
            pipe: {
                class: 'text-justify',
            }
        },
        {
            key: 'nombreCuenta',
            title: {
                name: 'Nombre de Cuenta',
                class: 'text-center',
            },
            pipe: {
                class: 'text-center',
            }
        },
        {
            key: 'porcentaje',
            title: {
                name: 'Porcentaje',
                class: 'text-center',
            },
            pipe: {
                class: 'text-justify',
            }
        },
        {
            key: 'baseRetencion',
            title: {
                name: 'Base de Retención',
                class: 'text-center',
            },
            pipe: {
                class: 'text-justify',
            }
        },
        {
            key: 'debito',
            title: {
                name: 'Débito',
                class: 'text-center',
            },
            pipe: {
                class: 'text-justify',
            }
        },
        {
            key: 'credito',
            title: {
                name: 'Crédito',
                class: 'text-center',
            },
            pipe: {
                class: 'text-justify',
            }
        },
    ],
    subtitle: {
        name: 'Retención - Estampilla', // name subtitle
        class: 'text-center bg-primary text-white', // bootstrap class
    },
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
    endSubtotal: {
        property: 'valorTotal', // key object
        items: [
            {
                colspan: 5, // relative offset number
                name: 'Sumatoria', // title item
                class: 'text-right', // bootstrap class
            },
        ],
        last: {
            class: 'text-left',
            pipe: {
                type: 'currency',
                config: [
                ],
                class: '',
            }
        }
    },
    sort: true,
    filter: false,
};
export const DATOS_TABLAIMPUESTO: any = [
    {
        tercero: '2020',
        numeroCuenta: '000326',
        nombreCuenta: 'Estampilla',
        porcentaje: '2',
        baseRetencion: '$67890',
        debito: '$67890',
        credito: '',
    },
    {
        tercero: '2020',
        numeroCuenta: '000326',
        nombreCuenta: 'Retencion',
        porcentaje: '2',
        baseRetencion: '$67890',
        debito: '$67890',
        credito: '',
    },
];
export const CONFIGURACION_TABLABANCOS: any = {
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'tercero',
            title: {
                name: 'Tercero',
                class: 'text-center',
            },
            pipe: {
                class: '',
            }
        },
        {
            key: 'numeroCuenta',
            title: {
                name: 'No. de Cuenta',
                class: 'text-center',
            },
            pipe: {
                class: 'text-justify',
            }
        },
        {
            key: 'nombreCuenta',
            title: {
                name: 'Nombre de Cuenta',
                class: 'text-center',
            },
            pipe: {
                class: 'text-center',
            }
        },
        {
            key: 'porcentaje',
            title: {
                name: 'Porcentaje',
                class: 'text-center',
            },
            pipe: {
                class: 'text-justify',
            }
        },
        {
            key: 'baseRetencion',
            title: {
                name: 'Base de Retención',
                class: 'text-center',
            },
            pipe: {
                class: 'text-justify',
            }
        },
        {
            key: 'debito',
            title: {
                name: 'Débito',
                class: 'text-center',
            },
            pipe: {
                class: 'text-justify',
            }
        },
        {
            key: 'credito',
            title: {
                name: 'Crédito',
                class: 'text-center',
            },
            pipe: {
                class: 'text-justify',
            }
        },
    ],
    subtitle: {
        name: 'Bancos', // name subtitle
        class: 'text-center bg-primary text-white', // bootstrap class
    },
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
    endSubtotal: {
        property: 'Total', // key object
        items: [
            {
                colspan: 5, // relative offset number
                name: 'Sumatoria', // title item
                class: 'text-right', // bootstrap class
            },
        ],
        last: {
            class: 'text-left',
            pipe: {
                type: 'currency',
                config: [
                ],
                class: '',
            }
        }
    },
    sort: true,
    filter: false,
};
export const DATOS_TABLABANCOS: any = [
    {
        tercero: '2020',
        numeroCuenta: '000326',
        nombreCuenta: 'Banco Popular',
        porcentaje: '',
        baseRetencion: '',
        debito: '',
        credito: '$67890',
    },
    {
        tercero: '2020',
        numeroCuenta: '000326',
        nombreCuenta: 'Banco Colpatria',
        porcentaje: '',
        baseRetencion: '',
        debito: '',
        credito: '$67890',
    },
];
