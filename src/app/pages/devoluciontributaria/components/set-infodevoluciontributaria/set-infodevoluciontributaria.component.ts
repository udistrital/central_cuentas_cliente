import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { getBeneficiarioOP, getConcepto, GetConceptosContables, getDevolucionTributariaById, getOrdenesPagoByDoc } from '../../../../shared/actions/shared.actions';
import { getConceptosContables, getNodoSeleccionadoConcepto, seleccionarConcepto, selectBeneficiarioOP, selectDevolucionTributariaById } from '../../../../shared/selectors/shared.selectors';
import { DATOS_CONSULTAOP, CONFIGURACION_CONSULTAOP, DATOS_SOLICITUD} from '../../interfaces/interfaces';
import { Store } from '@ngrx/store';
import { cargarDatosSolicitud, cargarDatosAlmacenadosSolicitud, cargarConcepto, loadInfoDevolucionTributaria } from '../../actions/devoluciontributaria.actions';
import { format_date, OPCIONES_AREA_FUNCIONAL } from '../../../../shared/interfaces/interfaces';
import { combineLatest } from 'rxjs';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'ngx-set-infodevoluciontributaria',
  templateUrl: './set-infodevoluciontributaria.component.html',
  styleUrls: ['./set-infodevoluciontributaria.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: format_date},
  ]
})
export class SetInfodevoluciontributariaComponent implements OnInit, OnDestroy {

  configConsultaOP: any;
  datosConsultaOP: any;
  infoDevolucionGroup: FormGroup;
  subscriptionConceptos$: any;
  conceptosContables: any;
  datosAlmacenadosDevolucion: any;
  datoAlmacenadoDevolucion: any;
  opcionesAreaFuncional: any;
  subscriptionFilter$: any;
  subBeneficiarioOP$: any;
  beneficiarioOP: any;
  subGetNodoSeleccionadoConcepto$: any;
  subConcepto$: any;
  concepto: any;
  subscriptionCambios$: any;
  tituloAccion: any;
  editable: boolean;
  subDevolucionTributaria$: any;
  devolucionesTributaria: any;
  flagDT;

  constructor(private fb: FormBuilder,
    private store: Store <any>,
    private _adapter: DateAdapter<any>,
    private activatedRoute: ActivatedRoute
    ) {
      this.editable = true;
      this.flagDT = true;
      this._adapter.setLocale(format_date);
      // Datos de ejemplo q se muestran en la tabla
      this.datosConsultaOP = DATOS_CONSULTAOP;
      this.configConsultaOP = CONFIGURACION_CONSULTAOP;
      this.datosAlmacenadosDevolucion = DATOS_SOLICITUD;
      this.opcionesAreaFuncional = OPCIONES_AREA_FUNCIONAL;
      this.createForm();
      this.store.dispatch(GetConceptosContables({}));
      this.tituloAccion = this.activatedRoute.snapshot.url[0].path;
      if (this.mostrar(this.tituloAccion)) {
        this.store.dispatch(getDevolucionTributariaById({id: this.activatedRoute.snapshot.url[1].path}));
        if (this.edit(this.tituloAccion)) this.editable = false;
      }
  }

  private mostrar(action: string): boolean {
    const ACCIONES: string[] = ['ver', 'editar', 'revisar'];
    return ACCIONES.some(acc => acc === action);
  }

  private edit(action: string): boolean {
    const ACCIONES_EDICION: string[] = ['ver', 'revisar'];
    return ACCIONES_EDICION.some(acc => acc === action);
  }


  ngOnInit() {
    // Conceptos contables
    this.subscriptionConceptos$ = this.store.select(getConceptosContables).subscribe((accion) => {
      if (accion && accion[0]) this.conceptosContables = accion[0];
    });

    this.subscriptionCambios$ = this.infoDevolucionGroup.get('conceptoContable').valueChanges.subscribe((valor) => {
      this.store.dispatch(cargarConcepto({ Concepto: valor }));
    });

    this.subscriptionCambios$ = this.infoDevolucionGroup.valueChanges.subscribe((valor) => {
      if (this.infoDevolucionGroup.valid) {
        this.store.dispatch(loadInfoDevolucionTributaria({ InfoDevolucionTributaria: valor }));
      }
    });

    this.subBeneficiarioOP$ = this.store.select(selectBeneficiarioOP).subscribe((action) => {
      if (action && action.BeneficiarioOP) {
        this.beneficiarioOP = action.BeneficiarioOP[0];
        action.BeneficiarioOP = null;
        this.infoDevolucionGroup.patchValue({
          nombreBeneficiario: this.beneficiarioOP.NomProveedor,
        });
      }
    });

    this.subDevolucionTributaria$ = this.store.select(selectDevolucionTributariaById).subscribe((action) => {
      if (this.flagDT && action && action.DevolucionTributariaById) {
        this.devolucionesTributaria = action.DevolucionTributariaById;
        this.flagDT = false;
        this.devolucionTributaria();
      }
    });

    this.getDatosBeneficiario();
    this.handleFormChanges();
  }

  getDatosBeneficiario() {
    this.subscriptionFilter$ = this.infoDevolucionGroup.get('numeroId').valueChanges.subscribe((valor) => {
      this.store.dispatch(getBeneficiarioOP({query: {NumDocumento: valor}}));
      this.store.dispatch(getOrdenesPagoByDoc({documento: valor}));
    });
  }

  handleFormChanges() {
    this.infoDevolucionGroup.valueChanges.subscribe(
      (result: any) => {
        if (result.numeroId !== '') {
          this.datosAlmacenadosDevolucion.filter(
            (data: any) => {
              if (data.numeroId === result.numeroId) {
                this.datoAlmacenadoDevolucion = data;
              } else {
                this.datoAlmacenadoDevolucion = [];
              }
            });
        }
      }
    );
  }

  agregarConcepto() {
    if (this.subGetNodoSeleccionadoConcepto$) this.subGetNodoSeleccionadoConcepto$.unsubscribe();
    this.subGetNodoSeleccionadoConcepto$ = this.store.select(getNodoSeleccionadoConcepto).subscribe((nodoConcepto) => {
      if (nodoConcepto && Object.keys(nodoConcepto)[0] !== 'type') {
        this.store.dispatch(getConcepto({codigo: nodoConcepto.Codigo}));
        if (this.subConcepto$) {
          this.subConcepto$.unsubscribe();
          this.concepto = null;
        }
        this.subConcepto$ = this.store.select(seleccionarConcepto).subscribe((concepto) => {
          if (concepto && concepto.Concepto) {
            this.concepto = concepto.Concepto;
            concepto.Concepto = null;
            this.infoDevolucionGroup.patchValue({
              conceptoContable: this.concepto
            });
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.subscriptionConceptos$.unsubscribe();
    if (this.subConcepto$) this.subConcepto$.unsubscribe();
    this.subscriptionCambios$.unsubscribe();
    this.subDevolucionTributaria$.unsubscribe();
    this.subscriptionFilter$.unsubscribe();
  }

  createForm() {
    this.infoDevolucionGroup = this.fb.group({
      areaFuncional: ['', Validators.required],
      fechaSolicitud: ['', Validators.required],
      numeroId: ['', Validators.required],
      nombreBeneficiario: ['', Validators.required],
      requerimiento: ['', Validators.required],
      conceptoContable: [''],
      razonDevolucion: [''],
      estado: [''],
    });
  }

  saveForm(data: any) {
    if ( this.infoDevolucionGroup.invalid ) {
      return Object.values( this.infoDevolucionGroup.controls ).forEach( control => {
        control.markAsTouched();
      });
    } else {
      this.store.dispatch(cargarDatosSolicitud(data));
      this.store.dispatch(cargarDatosAlmacenadosSolicitud(this.datoAlmacenadoDevolucion));
    }
  }

  devolucionTributaria() {
    if (this.mostrar(this.tituloAccion) && this.infoDevolucionGroup) {
      this.infoDevolucionGroup.patchValue({
        areaFuncional: this.opcionesAreaFuncional.find((e: any) => e.Id === this.devolucionesTributaria.AreaFuncional),
        requerimiento: this.devolucionesTributaria.NumeroRequerimiento,
        numeroId: this.devolucionesTributaria.DocumentoBeneficiario,
        nombreBeneficiario: this.devolucionesTributaria.NombreBeneficiario,
        fechaSolicitud: this.devolucionesTributaria.FechaSolicitud,
        razonDevolucion: this.devolucionesTributaria.RazonDevolucion,
        estado: this.devolucionesTributaria.Estado
      });
      this.store.dispatch(getConcepto({codigo: this.devolucionesTributaria.Concepto}));
      this.subConcepto$ = this.store.select(seleccionarConcepto).subscribe((concepto) => {
      if (concepto && concepto.Concepto) {
        this.concepto = concepto.Concepto;
        this.infoDevolucionGroup.patchValue({
          conceptoContable: concepto.Concepto
        });
        concepto.Concepto = null;
      }
    });
      this.getDatosBeneficiario();
    }
  }

  get areaFuncionalInvalid() {
    return this.infoDevolucionGroup.get('areaFuncional').invalid && this.infoDevolucionGroup.get('areaFuncional').touched;
  }
  get numeroRequerimiento() {
    return this.infoDevolucionGroup.get('requerimiento').invalid && this.infoDevolucionGroup.get('requerimiento').touched;
  }
  get fechaSolicitudInvalid() {
    return this.infoDevolucionGroup.get('fechaSolicitud').invalid && this.infoDevolucionGroup.get('fechaSolicitud').touched;
  }
  get numeroIdInvalid() {
    return this.infoDevolucionGroup.get('numeroId').invalid && this.infoDevolucionGroup.get('numeroId').touched;
  }
  get nombreBeneficiarioInvalid() {
    return this.infoDevolucionGroup.get('nombreBeneficiario').invalid && this.infoDevolucionGroup.get('nombreBeneficiario').touched;
  }
  get conceptoInvalid() {
    return this.infoDevolucionGroup.get('conceptoContable').invalid && this.infoDevolucionGroup.get('conceptoContable').touched;
  }
  get razonDevolucionInvalid() {
    return this.infoDevolucionGroup.get('razonDevolucion').invalid && this.infoDevolucionGroup.get('razonDevolucion').touched;
  }

}
