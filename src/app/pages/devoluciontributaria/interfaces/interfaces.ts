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
            key: 'NombreBeneficiario',
            title: {
                name: 'Nombre del beneficiario',
                label_i18n: 'nombre_beneficiario',
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
                name: 'acciones',
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
            disabled: false
        }
    },
    dataConfig: [
        {
            key: 'vigencia',
            title: {
                name: 'Vigencia',
                class: 'text-center',
                label_i18n: 'vigencia'
            },
            pipe: {
                class: 'text-center',
            }
        },
        {
            key: 'consecutivo',
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
            key: 'disponibilidad',
            title: {
                name: 'CDP',
                class: 'text-center',
                label_i18n: 'cdp'
            },
            pipe: {
                class: 'text-center',
            }
        },
        {
            key: 'registro',
            title: {
                name: 'RP',
                class: 'text-center',
                label_i18n: 'rp'
            },
            pipe: {
                class: 'text-center',
            }
        },
        {
            key: 'documento',
            title: {
                name: 'Documento',
                class: 'text-center',
                label_i18n: 'documento'
            },
            pipe: {
                class: 'text-center',
            }
        },
        {
            key: 'nombreBeneficiario',
            title: {
                name: 'Beneficiario',
                class: 'text-center',
                label_i18n: 'beneficiario'
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
                label_i18n: 'valor_total'
            },
            pipe: {
                type: 'currency',
                config: [],
                class: 'text-right align-middle'
            }
        },
    ],
    rowActions: {
        title: {
            name: 'Acciones',
            class: 'text-center bg-primary text-white',
            actionClass: 'd-flex flex-row justify-content-around align-middle'
        },
        actions: [
            {
                name: 'ver',
                icon: 'fas fa-solid fa-eye',
                class: 'p-2',
                title: 'Ver Orden de Pago',
                idStep: 3,
                ngIf: true
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
];
export const CONFIGURACION_CONTABILIZACION: any = {
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'Codigo',
            title: {
                name: 'No. de Cuenta',
                class: 'text-center bg-primary text-white',
                label_i18n: 'numero_cuenta'
            },
            pipe: {
                class: 'text-justify align-middle',
            }
        },
        {
            key: 'Tercero',
            title: {
                name: 'Tercero',
                class: 'text-center bg-primary text-white',
                label_i18n: 'tercero'
            },
            pipe: {
                class: 'text-center align-middle',
            }
        },
        {
            key: 'PorcentajeRetencion',
            title: {
                name: 'Porcentaje',
                class: 'text-center bg-primary text-white',
                label_i18n: 'porcentaje'
            },
            pipe: {
                class: 'text-center align-middle',
            }
        },
        {
            key: 'BaseRetencion',
            title: {
                name: 'Base de Retención',
                class: 'text-center bg-primary text-white',
                label_i18n: 'base_retencion'
            },
            pipe: {
                type: 'currency',
                config: [
                ],
                class: 'text-right align-middle',
            }
        },
        {
            key: 'Debito',
            title: {
                name: 'Débito',
                class: 'text-center bg-primary text-white',
                label_i18n: 'debito'
            },
            pipe: {
                type: 'currency',
                config: [
                ],
                class: 'text-right align-middle',
            }
        },
        {
            key: 'Credito',
            title: {
                name: 'Crédito',
                class: 'text-center bg-primary text-white',
                label_i18n: 'credito'
            },
            pipe: {
                type: 'currency',
                config: [
                ],
                class: 'text-right align-middle',
            }
        },
    ],
    sequence: {
        title: {
            name: 'Secuencia',
            class: 'text-center bg-primary text-white',
        },
        pipe: {
            class: 'text-center align-middle',
        }
    },
    rowActions: {
        title: {
            name: 'Acciones',
            class: 'text-center bg-primary text-white',
            actionClass: 'd-flex flex-row justify-content-around align-middle'
        },
        actions: [
            {
                name: 'eliminar',
                icon: 'fas fa-trash-alt',
                class: 'p-2',
                title: 'Ver Resumen de Devolución',
                idStep: 3,
                ngIf: true
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
export const DATOS_CONTABILIZACION: any = [
];
export const DATOS_SOLICITUD: any = [
    {
        nombre: 'Ana Prueba',
        numeroCuenta: '345234',
        tipoCuenta: 'corriente',
        numeroId: '345',
        entidad: 'Banco X'
    },
    {
        nombre: 'Otro Prueba',
        numeroCuenta: '345567',
        tipoCuenta: 'corriente',
        numeroId: '567',
        entidad: 'Banco Y'
    },
];
