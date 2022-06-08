export const CONFIGURACION_DOCUMENTOS: any = {
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'NombreArchivo',
            title: {
                name: 'Nombre del Archivo',
                class: 'text-center',
                label_i18n: 'nombre_archivo'
            },
            pipe: {
                class: 'text-justify',
            }
        },
        {
            key: 'TamañoArchivo',
            title: {
                name: 'Tamaño del Archivo',
                class: 'text-center',
                label_i18n: 'tamaño_archivo'
            },
            pipe: {
                class: 'text-center',
            }
        },
        {
            key: 'Estado',
            title: {
                name: 'Estado',
                class: 'text-center',
                label_i18n: 'estado'
            },
            pipe: {
                class: '',
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
                name: 'BorrarRegistro',
                icon: 'fas fa-trash-alt',
                class: 'p-2',
                title: 'Borrar Documento',
                ngIf: true,
            },
            {
                name: 'VerDocumento',
                icon: 'fas fa-eye',
                class: 'p-2',
                title: 'Ver Documento',
                ngIf: true,
            }
        ],
    },
};

export const CONFIGURACION_CONTABILIZACION: any = {
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'Secuencia',
            title: {
                name: 'Secuencia',
                class: 'text-center bg-primary text-white',
                label_i18n: 'secuencia',
            },
            pipe: {
                class: 'text-center align-middle',
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
            key: 'Nombre',
            title: {
                name: 'Nombre de la cuenta',
                class: 'text-center bg-primary text-white',
                label_i18n: 'nombre_cuenta'
            },
            pipe: {
                class: 'text-justify align-middle',
            }
        },
        {
            key: 'Detalle',
            title: {
                name: 'Detalle',
                class: 'text-center bg-primary text-white',
                label_i18n: 'detalle'
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
    noData: {
        name: 'No Existen Elementos Asociados',
        class: 'text-center',
    },
    sort: true,
    filter: false,
};

export const DATOS_CONTABILIZACION: any = [
    {
        Secuencia: '1',
        Codigo: '123',
        Tercero: '094',
        Credito: 0.00,
        Debito: 12000.00,
    },
];
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
