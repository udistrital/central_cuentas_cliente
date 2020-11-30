export const CONFIGURACION_TABLAREGISTROS: any = {
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'NumeroOrden',
            title: {
                name: 'No. de Órden',
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
            key: 'Mes',
            title: {
                name: 'Mes',
                class: 'text-center',
            },
            pipe: {
                class: 'text-center',
            }
        },
        {
            key: 'Quincena',
            title: {
                name: 'Quincena',
                class: 'text-center',
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
                title: 'Ver Resumen de Órden',
            }
        ],
    },
    noData: {
        name: 'No existen elementos asociados',
        class: 'text-center',
    },
    sort: true,
    filter: true,
};
export const DATOS_TABLAREGISTROS: any = [
    {
        NumeroOrden: '1',
        NombreBeneficiario: 'Dalia',
        Mes: 'Enero',
        Quincena: '1',
        Estado: 'Elaborado',
    },
    {
        NumeroOrden: '2',
        NombreBeneficiario: 'Marcela',
        Mes: 'Febrero',
        Quincena: '1',
        Estado: 'Elaborado',
    },
    {
        NumeroOrden: '3',
        NombreBeneficiario: 'Muñoz',
        Mes: 'Marzo',
        Quincena: '1',
        Estado: 'Elaborado',
    },
    {
        NumeroOrden: '4',
        NombreBeneficiario: 'Araque',
        Mes: 'Abril',
        Quincena: '2',
        Estado: 'Elaborado',
    },
    {
        NumeroOrden: '5',
        NombreBeneficiario: 'Cesar',
        Mes: 'Mayo',
        Quincena: '2',
        Estado: 'Elaborado',
    },
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