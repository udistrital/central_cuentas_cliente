export const CONFIGURACION_DOCUMENTOS: any = {
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'nombreArchivo',
            title: {
                name: 'Nombre del Archivo',
                class: 'text-center',
            },
            pipe: {
                class: 'text-justify',
            }
        },
        {
            key: 'tamañoArchivo',
            title: {
                name: 'Tamaño del Archibo',
                class: 'text-center',
            },
            pipe: {
                class: 'text-center',
            }
        },
        {
            key: 'estado',
            title: {
                name: 'Estado',
                class: 'text-center',
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
                name: 'secuencia',
                class: 'text-center bg-primary text-white',
                label_i18n: 'secuencia',
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
