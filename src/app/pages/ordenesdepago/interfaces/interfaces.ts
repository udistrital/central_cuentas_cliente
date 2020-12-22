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
        Estado: 'Elaborado',
    },
    {
        NumeroOrden: '2',
        NombreBeneficiario: 'Marcela',
        Estado: 'Elaborado',
    },
    {
        NumeroOrden: '3',
        NombreBeneficiario: 'Muñoz',
        Estado: 'Elaborado',
    },
    {
        NumeroOrden: '4',
        NombreBeneficiario: 'Araque',
        Estado: 'Elaborado',
    },
    {
        NumeroOrden: '5',
        NombreBeneficiario: 'Cesar',
        Estado: 'Elaborado',
    },
];
export const CONFIGURACION_CONCEPTO_VALOR: any = {
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'concepto',
            title: {
                name: 'Concepto',
                class: 'text-center',
            },
            pipe: {
                class: '',
            }
        },
        {
            key: 'valor',
            title: {
                name: 'Valor',
                class: 'text-center',
            },
            pipe: {
                class: 'text-justify',
            }
        },
    ],
    noData: {
        name: 'No existen elementos asociados',
        class: 'text-center',
    },
    sort: true,
};
export const DATOS_CONCEPTO_VALOR: any = [
    {
        concepto: '',
        valor: ''
    },
    {
        concepto: '',
        valor: ''
    }
];
export const CONFIGURACION_IMPUNTUACION: any = {
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'disponibilidad',
            title: {
                name: 'Disponibilidad',
                class: 'text-center',
            },
            pipe: {
                class: '',
            }
        },
        {
            key: 'codigo',
            title: {
                name: 'Código',
                class: 'text-center',
            },
            pipe: {
                class: 'text-justify',
            }
        },
        {
            key: 'registro',
            title: {
                name: 'Registro',
                class: 'text-center',
            },
            pipe: {
                class: 'text-justify',
            }
        },
        {
            key: 'nombre',
            title: {
                name: 'Nombre',
                class: 'text-center',
            },
            pipe: {
                class: 'text-justify',
            }
        },
        {
            key: 'valor',
            title: {
                name: 'Valor Aplicación (Gasto)',
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
                name: 'ver',
                icon: 'fas fa-eye',
                class: 'p-2',
                title: 'Ver Fuentes',
                idStep: 3
            },
            {
                name: 'modificar',
                icon: 'fas fa-trash-alt',
                class: 'p-2',
                title: 'Modificar',
                idStep: 3
            }
        ],
    },
    noData: {
        name: 'No existen elementos asociados',
        class: 'text-center',
    },
    sort: true,
    maxHeight: 200
};
export const DATOS_IMPUNTUACION: any = [
    {
        disponibilidad: '111',
        codigo: '111-222-333',
        registro: '123456',
        nombre: 'Eventos Academicos',
        valor: 3000000.00
    }
];
export const CONFIGURACION_MOVIMIENTO_CONTABLE: any = {
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'nombre',
            title: {
                name: 'Nombre Retención',
                class: 'text-center',
            },
            pipe: {
                class: '',
            }
        },
        {
            key: 'descuento',
            title: {
                name: 'Descuento',
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
                name: 'Base de Retención',
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
            key: 'codigo',
            title: {
                name: 'Código Contable',
                class: 'text-center',
            },
            pipe: {
                class: 'text-justify',
            }
        },
        {
            key: 'valor',
            title: {
                name: 'Valor',
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
                title: 'Modificar',
                idStep: 4
            }
        ],
    },
    noData: {
        name: 'No existen elementos asociados',
        class: 'text-center',
    },
    sort: true,
    maxHeight: 200
};
export const DATOS_MOVIMIENTO_CONTABLE: any = [
    {
        nombre: 'Valor Bruto',
        descuento: '',
        base: '',
        codigo: '111-222-333',
        valor: 3000000.00
    }
];

