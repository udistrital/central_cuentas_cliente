export const CONFIGURACION_TABLAREGISTROS: any = {
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'NumeroOrden',
            title: {
                name: 'No. de Órden Pago',
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
            key: 'AutorizacionGiro',
            title: {
                name: 'Autorización de giro',
                class: 'text-center',
            },
            pipe: {
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
export const DATOS_CONCEPTO_VALOR: any = [
    {
        codigoRubro: '',
        metas: '',
        actividades: '',
        fuenteFinanciamiento: '',
        rubroGasto: '',
        valor: '0'
    },
];
export const CONFIGURACION_CONCEPTO_VALOR: any = {
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'codigoRubro',
            title: {
                name: 'Codigo Rubro',
                class: 'text-center',
            },
            pipe: {
                class: '',
            }
        },
        {
            key: 'metas',
            title: {
                name: 'Metas',
                class: 'text-center',
            },
            pipe: {
                class: 'text-justify',
            }
        },
        {
            key: 'actividades',
            title: {
                name: 'actividades',
                class: 'text-center',
            },
            pipe: {
                class: 'text-justify',
            }
        },
        {
            key: 'fuenteFinanciamiento',
            title: {
                name: 'Fuente Financiamiento',
                class: 'text-center',
            },
            pipe: {
                class: 'text-justify',
            }
        },
        {
            key: 'rubroGasto',
            title: {
                name: 'Rubro Gasto (Producto)',
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
                class: 'text-right align-middle',
            }
        },
    ],
};
export const CONFIGURACION_HISTORIAL: any = {
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'consecutivoOP',
            title: {
                name: 'Consecutivo OP',
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
                type: 'currency',
                config: [
                ],
                class: 'text-right align-middle',
            }
        },
    ],
};
export const DATOS_HISTORIAL: any = [
];
export const CONFIGURACION_IMPUNTUACION: any = {
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'Disponibilidad',
            title: {
                name: 'Disponibilidad',
                class: 'text-center',
            },
            pipe: {
                class: 'text-center align-middle',
            }
        },
        {
            key: 'Codigo',
            title: {
                name: 'Código',
                class: 'text-center',
            },
            pipe: {
                class: 'text-justify',
            }
        },
        {
            key: 'Registro',
            title: {
                name: 'Registro',
                class: 'text-center',
            },
            pipe: {
                class: 'text-center align-middle',
            }
        },
        {
            key: 'Nombre',
            title: {
                name: 'Nombre',
                class: 'text-center',
            },
            pipe: {
                class: 'text-justify',
            }
        },
        {
            key: 'Valor',
            title: {
                name: 'Valor Aplicación (Gasto)',
                class: 'text-center',
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
            class: 'text-center',
            actionClass: 'd-flex flex-row justify-content-around align-middle'
        },
        actions: [
            {
                name: 'ver',
                icon: 'fas fa-eye',
                class: 'p-2',
                title: 'Ver Fuentes',
                idStep: 3,
                ngIf: true
            },
            {
                name: 'modificar',
                icon: 'fas fa-trash-alt',
                class: 'p-2',
                title: 'Modificar',
                idStep: 3,
                ngIf: true
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
        Disponibilidad: '111',
        Codigo: '111-222-333',
        Registro: '123456',
        Nombre: 'Eventos Academicos',
        Valor: 3000000.00
    }
];
export const CONFIGURACION_CONTABILIZACION: any = {
    showColumnTitle: true,
    dataConfig: [
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
            key: 'NombreMovimiento',
            title: {
                name: 'Nombre',
                class: 'text-center bg-primary text-white',
                label_i18n: 'nombre'
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
                class: 'text-justify align-middle',
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
    sequence: {
        title: {
            name: 'Secuencia',
            class: 'text-center bg-primary text-white',
        },
        pipe: {
            class: 'text-center align-middle',
        }
    },
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
                title: 'Eliminar movimiento',
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
    {
        Nombre: '',
        Codigo: '',
        Credito: 0,
        Debito: 0,
        Naturaleza: '',
        Tercero: '',
        CuentaContableId: '',
    }
];
export const CONFIGURACION_IMPUESTOS_RETENCIONES: any = {
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'Nombre',
            title: {
                name: 'Nombre',
                class: 'text-center',
            },
            pipe: {
                class: 'text-center align-middle',
            }
        },
        {
            key: 'Codigo',
            title: {
                name: 'Código Contable',
                class: 'text-center',
            },
            pipe: {
                class: 'text-center align-middle',
            }
        },
        {
            key: 'Base',
            title: {
                name: 'Base',
                class: 'text-center',
            },
            pipe: {
                type: 'currency',
                config: [
                ],
                class: 'text-right align-middle',
            }
        },
        {
            key: 'Descuento',
            title: {
                name: '% Descuento',
                class: 'text-center',
            },
            pipe: {
                class: 'text-center align-middle',
            }
        },
        {
            key: 'Valor',
            title: {
                name: 'Valor',
                class: 'text-center',
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
            class: 'text-center',
            actionClass: 'd-flex flex-row justify-content-around align-middle'
        },
        actions: [
            {
                name: 'modificar',
                icon: 'fas fa-trash-alt',
                class: 'p-2',
                title: 'Modificar',
                idStep: 4,
                ngIf: true
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
export const DATOS_IMPUESTOS_RETENCIONES: any = [
    {
        Nombre: '',
        Codigo: '',
        Base: 0,
        Descuento: '',
        Valor: 0,
        CuentaContableId: ''
    }
];
export const DATOS_BENEFICIARIO: any = [
    {
        numeroId: 43,
        nombre: 'Ana',
        regimen: 'Contributivo',
        direccion: 'Cra 8 # 10-20',
        telefono: '32131',
    }
];
export const DATOS_COMPROMISO: any = [
    {
        numeroCompromiso: 16,
        numeroActa: 44,
        numeroEntradaAlmacen: 345,
        nombreInterventor: 'Fernando',
        detalle: 'Datos de prueba',
    }
];

export const DATOS_TIPO_CONVENIO: any = [
    {
        tipo_convenio: 'CONVENIOS',
    },
    {
        tipo_convenio: 'CONTRATOS',
    }
];


export const CONFIGURACION_TABLA_ESTADOS: any = {
    showColumnTitle: false,
    dataConfig: [
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
    noData: {
        name: 'No existen elementos asociados',
        class: 'text-center',
    },
    sort: true,
    title: {
        name: 'ESTADOS',
        class: 'text-center text-uppercase'
    }
};
export const DATOS_ESTADOS: any = [
    {
        estado: 'elaborado'
    },
    {
        estado: 'aprobado'
    }
];
