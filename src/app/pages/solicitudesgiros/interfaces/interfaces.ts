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
      nombreArchivo: 'doc1.pdf',
      estado: 'Listo'
    },
    {
        nombreDocumento: 'documento2',
        nombreArchivo: 'doc2.pdf',
        estado: 'Listo'
    },
    {
        nombreDocumento: 'documento3',
        nombreArchivo: 'doc3.pdf',
        estado: 'Listo'
    },
];
