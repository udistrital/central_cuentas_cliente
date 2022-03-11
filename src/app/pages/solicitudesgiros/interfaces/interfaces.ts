export const CONFIGURACION_TABLAREGISTROS: any = {
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'NumeroSolicitud',
            title: {
                name: 'No. de Solicitud',
                class: 'text-center',
            },
            pipe: {
                class: 'center',
            }
        },
        {
            key: 'NombreBeneficiario',
            title: {
                name: 'Nombre del Beneficiario',
                class: 'text-center',
            },
            pipe: {
                class: 'center',
            }
        },
        {
            key: 'Fecha',
            title: {
                name: 'Fecha de Creacion',
                class: 'text-center',
            },
            pipe: {
                type: 'date',
                config: [
                    'shortDate'
                ],
                class: 'center',
            }
        },
        {
            key: 'Estado',
            title: {
                name: 'Estado',
                class: 'text-center',
            },
            pipe: {
                class: 'center',
            }
        },
        {
            key: 'acciones',
            title: {
                name: 'acciones',
                class: 'text-center',
            },
            pipe: {
                class: 'icons'
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
                title: 'Ver Resumen de Solicitud',
            },
        ],
    },
    // tableActions: [
    //     {
    //         name: 'nuevo',
    //         icon: 'fas fa-plus py-1 px-2',
    //         class: 'px-2',
    //         title: 'Crear Nueva Solicitud',
    //     }
    // ],
    noData: {
        name: 'No Existen Elementos Asociados',
        class: 'text-center',
    },
    sort: true,
    filter: true,
};

export const CONFIGURACION_DOCUMENTOS: any = {
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'nombreDocumento',
            title: {
                name: 'Nombre del Documento',
                class: 'text-center',
            },
            pipe: {
                class: '',
            }
        },
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
            key: 'estado',
            title: {
                name: 'Estado',
                class: 'text-center',
            },
            pipe: {
                class: '',
            }
        },
        {
            key: 'acciones',
            title: {
                name: 'Acciones',
                class: 'text-center',
            },
            pipe: {
                class: 'icons'
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
                name: 'BorrarRegistro',
                icon: 'fas fa-trash-alt',
                class: 'p-2',
                title: 'Borrar Documento',
            },
            {
                name: 'VerDocumento',
                icon: 'fas fa-eye',
                class: 'p-2',
                title: 'Ver Documento',
            }
        ],
    },
};

export interface EstructuraArbolRubrosApropiaciones {
    Codigo: string;
    Descripcion?: string;
    ValorInicial: number;
    Hijos?: EstructuraArbolRubrosApropiaciones[];
    Movimientos?: string[];
    Padre?: string;
    UnidadEjecutora: number;
    Estado?: string;
    IsLeaf: boolean;
    expanded?: boolean;
    isHighlighted?: boolean;
    data?: EstructuraArbolRubrosApropiaciones;
    children?: EstructuraArbolRubrosApropiaciones[];
  }
