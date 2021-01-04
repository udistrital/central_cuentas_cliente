export const CONFIGURACION_TABLA_SOLICITUDES: any = {
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'vigencia',
            title: {
                name: 'Vigencia',
                class: 'text-center',
            },
            pipe: {
                class: '',
            }
        },
        {
            key: 'numeroSolicitud',
            title: {
                name: 'Número de solicitud',
                class: 'text-center',
            },
            pipe: {
                class: 'text-center',
            }
        },
        {
            key: 'numeroDevolucion',
            title: {
                name: 'Número de Devolución',
                class: 'text-center',
            },
            pipe: {
                class: 'text-center',
            }
        },
        {
            key: 'areaFuncional',
            title: {
                name: 'Área Funcional',
                class: 'text-center',
            },
            pipe: {
                class: 'text-center',
            }
        },
        {
            key: 'tipoDevolucion',
            title: {
                name: 'Tipo de Devolución',
                class: 'text-center',
            },
            pipe: {
                class: 'text-center',
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
                title: 'Ver Solicitud',
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
export const DATOS_TABLA_SOLICITUDES: any = [
    {
        vigencia: '000',
        numeroSolicitud: '',
        numeroDevolucion: '',
        areaFuncional: '',
        tipoDevolucion: 'Orden de Pago',
    },
    {
        vigencia: '000',
        numeroSolicitud: '',
        numeroDevolucion: '',
        areaFuncional: '',
        tipoDevolucion: 'Relación de Autorización',
    },
    { vigencia: '000', numeroSolicitud: '', numeroDevolucion: '', areaFuncional: '', tipoDevolucion: '', },
    { vigencia: '000', numeroSolicitud: '', numeroDevolucion: '', areaFuncional: '', tipoDevolucion: '', },
    { vigencia: '000', numeroSolicitud: '', numeroDevolucion: '', areaFuncional: '', tipoDevolucion: '', },
    { vigencia: '000', numeroSolicitud: '', numeroDevolucion: '', areaFuncional: '', tipoDevolucion: '', },
];

export const CONFIGURACION_TABLA_ANEXOS: any = {
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'nombre',
            title: {
                name: 'Nombre del Documento',
                class: 'text-center',
            },
            pipe: {
                class: '',
            }
        },
        {
            key: 'estado',
            title: {
                name: 'Estado',
                class: 'text-center',
            },
            pipe: {
                class: 'text-center',
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
                name: 'modificar',
                icon: 'fas fa-trash-alt',
                class: 'p-2',
                title: 'Eliminar anexo',
                idTable: 'anexos'
            }
        ],
    },
    noData: {
        name: 'No existen elementos asociados',
        class: 'text-center',
    },
    maxHeight: 200
};
export const DATOS_TABLA_ANEXOS: any = [
    {
        nombre: 'Copia de la orden de contrato',
        estado: '',
    },
    {
        nombre: 'Documento 1',
        estado: '',
    },
];


export const CONFIGURACION_TABLA_IMPUESTOS: any = {
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'nombreImpuesto',
            title: {
                name: 'Nombre del Impuesto',
                class: 'text-center',
            },
            pipe: {
                class: '',
            }
        },
        {
            key: 'porcentaje',
            title: {
                name: 'Porcentaje',
                class: 'text-center',
            },
            pipe: {
                type: 'percent',
                config: [
                ],
                class: 'text-center align-middle',
            }
        },
        {
            key: 'base',
            title: {
                name: 'Base',
                class: 'text-center',
            },
            pipe: {
                type: 'currency',
                config: [
                ],
                class: 'text-center align-middle',
            }
        },
        {
            key: 'valorLetras',
            title: {
                name: 'Valor en Letras',
                class: 'text-center',
            },
            pipe: {
                class: 'text-center',
            }
        },
        {
            key: 'valorCifras',
            title: {
                name: 'Valor en Cifras',
                class: 'text-center',
            },
            pipe: {
                type: 'currency',
                config: [
                ],
                class: 'text-center align-middle',
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
                name: 'modificar',
                icon: 'fas fa-trash-alt',
                class: 'p-2',
                title: 'Eliminar impuesto',
                idTable: 'impuestos'
            }
        ],
    },
    noData: {
        name: 'No existen elementos asociados',
        class: 'text-center',
    },
    maxHeight: 200
};
export const DATOS_TABLA_IMPUESTOS: any = [
    {
        nombreImpuesto: 'IVA',
        porcentaje: 0.19,
        base: 100,
        valorLetras: '',
        valorCifras: 19
    }
];
