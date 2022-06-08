export const CONFIGURACION_TABLAREGISTROS: any = {
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'Consecutivo',
            title: {
                name: 'Consecutivo',
                label_i18n: 'consecutivo',
                class: 'text-center',
            },
            pipe: {
                class: 'center border',
            }
        },
        {
            key: 'Estado',
            title: {
                name: 'Estado',
                label_i18n: 'estado',
                class: 'text-center',
            },
            pipe: {
                class: 'center border',
            }
        },
        {
            key: 'acciones',
            title: {
                name: 'Acciones',
                label_i18n: 'acciones',
                class: 'text-center',
            },
            pipe: {
                class: 'icons border'
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
];

export const CONFIGURACION_CONSULTAOD: any = {
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
            disabled: false
        }
    },
    dataConfig: [
        {
            key: 'Consecutivo',
            title: {
                name: 'Consecutivo',
                class: 'text-center',
                label_i18n: 'consecutivo'
            },
            pipe: {
                class: 'text-center',
            }
        },
        {
            key: 'Beneficiario',
            title: {
                name: 'Beneficiario',
                class: 'text-center',
                label_i18n: 'beneficiario'
            },
            pipe: {
                class: 'text-center',
            }
        },
        {
            key: 'TipoDocumento',
            title: {
                name: 'Tipo de Documento',
                class: 'text-center',
                label_i18n: 'tipo_documento'
            },
            pipe: {
                class: 'text-center',
            }
        },
        {
            key: 'NumeroDocumento',
            title: {
                name: 'Número Documento',
                class: 'text-center',
                label_i18n: 'numero_documento'
            },
            pipe: {
                class: 'text-center',
            }
        },
        {
            key: 'FormaPago',
            title: {
                name: 'Forma de Pago',
                class: 'text-center',
                label_i18n: 'forma_pago'
            },
            pipe: {
                class: 'text-center',
            }
        },
        {
            key: 'Banco',
            title: {
                name: 'Banco',
                class: 'text-center',
                label_i18n: 'banco'
            },
            pipe: {
                class: 'text-justify',
            }
        },
        {
            key: 'TipoCuenta',
            title: {
                name: 'Tipo de Cuenta',
                class: 'text-center',
                label_i18n: 'tipo_cuenta'
            },
            pipe: {
                class: 'text-center align-middle'
            }
        },
        {
            key: 'NumeroCuenta',
            title: {
                name: 'Número de Cuenta',
                class: 'text-center',
                label_i18n: 'numero_cuenta'
            },
            pipe: {

                class: 'text-center align-middle'
            }
        },
        {
            key: 'Valor',
            title: {
                name: 'Valor',
                class: 'text-center',
                label_i18n: 'valor'
            },
            pipe: {
                type: 'currency',
                config: [],
                class: 'text-right align-middle'
            }
        },
    ],
    noData: {
        name: 'No Existen Elementos Asociados',
        class: 'text-center',
    },
    sort: true,
    filter: true,
};
