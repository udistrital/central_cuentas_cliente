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
export const DATOS_TABLAREGISTROS: any = [
    {
        NumeroSolicitud: '0',
        NombreBeneficiaro: 'Juana',
        Fecha: '2020-11-20T02:18:54Z',
        Estado: 'Elaborado',
    },
    {
        NumeroSolicitud: '1',
        NombreBeneficiaro: 'Juan',
        Fecha: '2020-11-20T02:18:54Z',
        Estado: 'Elaborado',
    },
    {
        NumeroSolicitud: '2',
        NombreBeneficiaro: 'Alberto',
        Fecha: '2020-11-20T02:18:54Z',
        Estado: 'Elaborado',
    },
    {
        NumeroSolicitud: '3',
        NombreBeneficiaro: 'Miguel',
        Fecha: '2020-11-20T02:18:54Z',
        Estado: 'Elaborado',
    },
    {
        NumeroSolicitud: '4',
        NombreBeneficiaro: 'Carlos',
        Fecha: '2020-11-20T02:18:54Z',
        Estado: 'Elaborado',
    }
];
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
    ],
    rowActions: {
        title: {
            name: 'Modificar',
            class: 'text-center',
            actionClass: 'd-flex flex-row justify-content-around align-middle'
        },
        actions: [
            {
                name: 'ver',
                icon: 'fas fa-trash-alt',
                class: 'p-2',
                title: 'Borrar Documento',
            },
        ],
    },
};
export const DATOS_DOCUMENTOS: any = [
    {
      nombreDocumento: 'documento1',
      nombreArchivo: 'Listo',
      estado: 'Listo'
    },
    {
        nombreDocumento: 'documento2',
        nombreArchivo: 'Listo',
        estado: 'Listo'
    },
    {
        nombreDocumento: 'documento3',
        nombreArchivo: 'Listo',
        estado: 'Listo'
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
