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
            key: 'NombreBeneficiario',
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
    {
        nombreDocumento: 'Certificado de Disponibilidad',
        nombreArchivo: 'PRUEBA.pdf',
        estado: 'Listo',
        uid: 'ed9ac7d9-e3cf-4de6-8c16-3a5a486dfb8f'
    },
    {
        nombreDocumento: 'Certificado de Disponibilidad',
        nombreArchivo: 'PRUEBA2.pdf',
        estado: 'Listo',
        uid: '64ca031d-c66d-4591-ae72-e437bf3337ff'
    }
];
