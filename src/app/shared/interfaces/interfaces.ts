export const configTable: any = {
    title: {
        name: 'string', // name title
        class: 'string', // bootstrap class
    },
    showColumnTitle: true, // show / hide columns title
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
            key: 'string', // object key
            title: 'string', // column title
            pipe: {
                type: 'string', // date, currency, decimal, percent, custom ( optional )
                config: [
                    'string', // array like pipe, no custom
                    () => { }, // only custom pipe
                ], //  ( optional )
                class: 'string', // bootstrap class
            }
        }
    ],
    subtitle: {
        name: 'string', // name subtitle
        class: 'string', // bootstrap class
    },
    rowActions: {
        title: {
            name: 'string', // Title Actions
            class: 'string', // bootstrap class
        },
        actions: [
            {
                name: 'string', // name action
                icon: 'string', // icon action (font-awesome icons)
                class: 'string', // bootstrap class
                title: 'string', // bootstrap tooltip name
            }
        ],
    },
    tableActions: [
        {
            name: 'string', // name action
            icon: 'string', // icon action (font-awesome icons)
            class: 'string', // bootstrap class
            title: 'string', // bootstrap tooltip name
        }
    ],
    noData: {
        name: 'string', // title no data
        class: 'string', // bootstrap class
    },
    endSubtotal: {
        property: 'string', // key object
        items: [
            {
                colspan: 'number', // relative offset number
                name: 'string', // title item
                class: 'string', // bootstrap class
            },
        ],
        last: {
            name: 'string', // if fixed name ( optional )
            class: 'string',
            pipe: {
                type: 'string', // date, currency, decimal, percent, custom ( optional )
                config: [
                    'string', // array like pipe, no custom
                    () => { }, // only custom pipe
                ], //  ( optional )
                class: 'string', // bootstrap class
            }
        }
    },
    sort: 'boolean',
    filter: 'boolean',
};
export const CONFIGURACION_PRUEBA: any = {
    dataConfig: [
        {
            key: 'id',
            title: {
                name: 'Numero',
                class: 'text-center',
            },
            pipe: {
                class: '',
            }
        },
        {
            key: 'nombre',
            title: {
                name: 'Nombre',
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
                name: 'editar',
                icon: 'fas fa-pencil-alt',
                class: 'p-2',
                title: 'Editar',
            },
            {
                name: 'metas',
                icon: 'fas fa-list',
                class: 'p-2',
                title: 'Ver Metas',
            }
        ],
    },
    tableActions: [
        {
            name: 'nuevo',
            icon: 'fas fa-plus py-1 px-2',
            class: 'px-2',
            title: 'Agregar Nuevo Lineamiento',
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
        id: 1,
        nombre: 'Jhoan',
        others: {
            label: 2,
            org: 'asdfasdfasdf'
        },
        arrayTest: [
            'dasdfasdfasdf',
            'asdfasdfasdfasdf',
            'asdfasdfasdfasdf'
        ]
    },
    {
        id: 2,
        nombre: 'Manuel',
        others: {
            label: 2,
            org: 'asdfasdfasdf'
        },
        arrayTest: [
            'dasdfasdfasdf',
            'asdfasdfasdfasdf',
            'asdfasdfasdfasdf'
        ]
    },
    {
        id: 3,
        nombre: 'Murillo',
        others: {
            label: 2,
            org: 'asdfasdfasdf'
        },
        arrayTest: [
            'dasdfasdfasdf',
            'asdfasdfasdfasdf',
            'asdfasdfasdfasdf'
        ]
    },
    {
        id: 4,
        nombre: 'Yara',
        others: {
            label: 2,
            org: 'asdfasdfasdf'
        },
        arrayTest: [
            'dasdfasdfasdf',
            'asdfasdfasdfasdf',
            'asdfasdfasdfasdf'
        ]
    },
];

export interface ArbolRubros<T> {
    Codigo: string;
    data?: T;
    children?: ArbolRubros<T>[];
    expanded?: boolean;
}
export interface DatosNodo {
    Codigo: string;
    Descripcion?: string;
    ValorInicial?: number;
    Hijos?: any[];
    Movimientos?: string[];
    Padre?: string;
    UnidadEjecutora?: number;
    Estado?: string;
    IsLeaf?: boolean;
}

export const DATA_TREE_NODE: any = [
    {
        data: {
            name: 'Projects',
            size: '1.8 MB',
            items: 5,
            kind: 'dir'
        },
        children: [
            {
                data: {
                    name: 'project-1.doc',
                    kind: 'doc',
                    size: '240 KB'
                },
                children: [],
            },
            {
                data: {
                    name: 'project-2.doc',
                    kind: 'doc',
                    size: '290 KB'
                },
                children: [],
            },
            {
                data: {
                    name: 'project-3',
                    kind: 'dir',
                    size: '466 KB',
                    items: 3
                },
                children: [
                    {
                        data: {
                            name: 'project-3A.doc',
                            kind: 'doc',
                            size: '200 KB'
                        },
                        children: [],
                    },
                    {
                        data: {
                            name: 'project-3B.doc',
                            kind: 'doc',
                            size: '266 KB'
                        },
                        children: [],
                    },
                    {
                        data: {
                            name: 'project-3C.doc',
                            kind: 'doc',
                            size: '0'
                        },
                        children: [],
                    },
                ],
            },
            {
                data: {
                    name: 'project-4.docx',
                    kind: 'docx',
                    size: '900 KB'
                },
                children: [],
            },
        ],
    },
    {
        data: {
            name: 'Reports',
            kind: 'dir',
            size: '400 KB',
            items: 2
        },
        children: [
            {
                data: {
                    name: 'Report 1',
                    kind: 'dir',
                    size: '100 KB',
                    items: 1
                },
                children: [
                    {
                        data: {
                            name: 'report-1.doc',
                            kind: 'doc',
                            size: '100 KB'
                        },
                        children: [],
                    },
                ],
            },
            {
                data: {
                    name: 'Report 2',
                    kind: 'dir',
                    size: '300 KB',
                    items: 2
                },
                children: [
                    {
                        data: {
                            name: 'report-2.doc',
                            kind: 'doc',
                            size: '290 KB'
                        },
                        children: [],
                    },
                    {
                        data: {
                            name: 'report-2-note.txt',
                            kind: 'txt',
                            size: '10 KB'
                        },
                        children: [],
                    },
                ],
            },
        ],
    },
];

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
    noData: {
        name: 'No Existen Elementos Asociados',
        class: 'text-center',
    },
    sort: true,
    filter: true,
};

export const OPCIONES_AREA_FUNCIONAL = [
    {
        Id: 1,
        Nombre: 'Rector',
        label: '01 - Rector',
    },
    {
        Id: 2,
        Nombre: 'Convenio',
        label: '02 - Convenio',
    }

];

export interface ArbolCuentasContables<L> {
    Codigo?: string;
    data?: L;
    children?: ArbolCuentasContables<L>[];
    expanded?: boolean;
    Nivel: number;
    Nombre: string;
}

export interface DatosNodoCuentaContable {
    Codigo?: string;
    Hijos?: any[];
    Nivel: number;
    Nombre: string;
    Padre?: string;
}

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
