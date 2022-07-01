import { Component, EventEmitter, Output, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CONFIGURACION_TABLACONSULTA, CONFIGURACION_TABLAFUENTES, DATOS_TABLACONSULTA, DATOS_TABLAFUENTES } from '../../interfaces/interfaces';
import { Store } from '@ngrx/store';
import { getAccionTabla, getFilaSeleccionada, selectCrp, selectDataCdp, selectDataCrp, selectInfoCrp,
          selectInfoNecesidadCdp, selectInfoNecesidadCrp, selectInfoRubro, selectNecesidad, selectRubros, selectSolicitudesCdp, selectVigencias } from '../../../../shared/selectors/shared.selectors';
import { loadRelacionautorizacionesSeleccionado } from '../../actions/relacionautorizaciones.actions';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { getCrp, getDataCdp, getDataCrp, getInfoCrp, getInfoNecesidadCdp, getInfoNecesidadCrp, getInfoRubro, getNecesidad,
          getRubros, getSolicitudesCdp, getVigencias, LoadFilaSeleccionada } from '../../../../shared/actions/shared.actions';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'ngx-set-consultanuevarelacion',
  templateUrl: './set-consultanuevarelacion.component.html',
  styleUrls: ['./set-consultanuevarelacion.component.scss']
})
export class SetConsultanuevarelacionComponent implements OnInit, OnDestroy {
  @ViewChild('eliminarDatoModal', { static: false }) eliminarDatoModal: ElementRef;

  consultaGroup: FormGroup;
  closeResult = '';
  // Configuracion de datos ejemplo en la tabla
  configuracion: any;
  datosConsulta: any;
  configuracionTablaFuentes: any;
  datosTablaFuentes: any;
  subscription$: any;
  subscription: any;
  stringBusqueda: string;
  subVigencias$: any;
  vigencias: any;
  subCrp$: any;
  crps: any;
  subInfoCrp$: any;
  infoCrp: any;
  subDataCrp$: any;
  dataCrp: any;
  subDataCdp$: any;
  dataCdp: any;
  subNecesidad$: any;
  necesidad: any;
  subInfoNecesidad$: any;
  infoNecesidad: any;
  subInfoNecesidadCdp$: any;
  infoNecesidadcdp: any;
  subSolicitudesCdp$: any;
  solicitudesCdp: any;
  subRubros$: any;
  rubros: any;
  subInfoRubros$: any;
  infoRubros: any;
  aux: any;
  fuentesAfectables: any;
  valorFuenteAfectable: number;
  totalFuentes: number;
  filteredOptions: Observable<string[]>;
  myControl = new FormControl();
  @Output() selectedAction: EventEmitter<any>;

  constructor( private fb: FormBuilder, private store: Store<any>, private modalService: NgbModal) {
    this.totalFuentes = 0;
    this.store.dispatch(getVigencias());
    this.datosConsulta = DATOS_TABLACONSULTA;
    this.configuracion = CONFIGURACION_TABLACONSULTA;
    this.configuracionTablaFuentes = CONFIGURACION_TABLAFUENTES;
    this.datosTablaFuentes = DATOS_TABLAFUENTES;
    // Configuracion de la tabla
    this.stringBusqueda = '';
    this.selectedAction = new EventEmitter<any>();
    this.createForm();
   }

  // Validacion del Formulario
  get disponibilidadInvalid() {
    return this.consultaGroup.get('codigoDisponibilidad').invalid && this.consultaGroup.get('codigoDisponibilidad').touched;
  }
  get registroInvalid() {
    return this.consultaGroup.get('codigoRegistro').invalid && this.consultaGroup.get('codigoRegistro').touched;
  }

  ngOnInit() {
    // Eliminar datos que se encuentran en la tabla
    this.subscription = this.store.select(getFilaSeleccionada).subscribe((accion) => {
      if (accion && accion.accion) {
        if (accion.accion.name === 'BorrarRegistroConsulta' && accion.accion.idStep === 2) {
          this.modalEliminar(accion.fila);
        }
      }
    });
    // Mostrar datos ingresados en la tabla
    this.subscription$ = this.store.select(getFilaSeleccionada).subscribe((fila: any) => {
      if (fila) {
        this.store.dispatch(loadRelacionautorizacionesSeleccionado(fila.fila));
      }
    });
    this.subscription$ = this.store.select(getAccionTabla).subscribe((accion: any) => {
      this.store.dispatch(loadRelacionautorizacionesSeleccionado(null));
    });
    this.subVigencias$ = this.store.select(selectVigencias).subscribe(action => {
      if (action && action[0]) {
        this.vigencias = [];
        action[0].forEach(element => {
          if (element.areaFuncional === '1') this.vigencias.push(element);
        });
      }
    });
  }

  buscarCrp() {
    this.store.dispatch(getCrp({vigencia: this.consultaGroup.value.vigencia.valor}));
    this.subCrp$ = this.store.select(selectCrp).subscribe(action => {
      if (action && action.Crp) {
          this.crps = action.Crp;
          action.Crp = null;
          this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value, this.crps)),
          );
      }
    });
  }

  buscarInfoCrp() {
    this.store.dispatch(getInfoCrp({id: this.consultaGroup.value.aux.Data.solicitud_crp}));
    this.subInfoCrp$ = this.store.select(selectInfoCrp).subscribe(action => {
      if (action && action.InfoCrp) {
        this.infoCrp = action.InfoCrp;
        this.consultaGroup.patchValue({
          codigoDisponibilidad: this.infoCrp.consecutivoCdp
        });
        this.getCdp();
        this.store.dispatch(getDataCrp({vigencia: this.consultaGroup.value.vigencia.valor, query: {consecutivo: this.infoCrp.consecutivoCdp, tipo: 'cdp'}}));
        this.subDataCrp$ = this.store.select(selectDataCrp).subscribe(action1 => {
          if (action1 && action1.DataCrp) {
            this.dataCrp = action1.DataCrp[0];
            this.getNecesidad();
          }
        });
      }
    });
  }

  getNecesidad() {
    this.store.dispatch(getNecesidad({id: this.dataCrp.Data.solicitud_cdp}));
    this.subNecesidad$ = this.store.select(selectNecesidad).subscribe(action => {
      if (action && action.Necesidad) {
        this.necesidad = action.Necesidad;
        this.store.dispatch(getInfoNecesidadCrp({id: this.necesidad.necesidad}));
        this.subInfoNecesidad$ = this.store.select(selectInfoNecesidadCrp).subscribe(action1 => {
          if (action1 && action1.InfoNecesidadCrp) {
            this.infoNecesidad = action1.InfoNecesidadCrp;
            this.consultaGroup.patchValue({
              descripcionCrp: this.infoNecesidad.Necesidad.Objeto
            });
            this.getRubro();
          }
        });
      }
    });
  }

  getRubro() {
    this.store.dispatch(getRubros({vigencia: this.consultaGroup.value.vigencia.valor, id: this.consultaGroup.value.aux._id}));
    this.subRubros$ = this.store.select(selectRubros).subscribe(action => {
      if (action && action.Rubros) {
        this.rubros = action.Rubros[0].FatherInfo.nodorubro._id;
        this.store.dispatch(getInfoRubro({rubro: this.rubros}));
        this.subInfoRubros$ = this.store.select(selectInfoRubro).subscribe(action1 => {
          if (action1 && action1.InfoRubro) {
            this.infoRubros = action1.InfoRubro;
          }
        });
      }
    });
  }

  getCdp() {
    this.store.dispatch(getSolicitudesCdp({query: {'estado.acronimo': 'exp'}}));
    this.subSolicitudesCdp$ = this.store.select(selectSolicitudesCdp).subscribe(action => {
      if (action && action.SolicitudesCdp) {
        this.solicitudesCdp = action.SolicitudesCdp;
        this.store.dispatch(getDataCdp({vigencia: this.consultaGroup.value.vigencia.valor}));
        this.subDataCdp$ = this.store.select(selectDataCdp).subscribe(action1 => {
          if (action1 && action1.DataCdp) {
            this.dataCdp = action1.DataCdp;
            const aux = this.dataCdp.find((e: any) => e.Consecutivo === this.consultaGroup.value.codigoDisponibilidad);
            const aux1 = this.solicitudesCdp.find((e: any) => e._id === aux.Data.solicitud_cdp);
            this.store.dispatch(getInfoNecesidadCdp({id: aux1.necesidad}));
            this.subInfoNecesidadCdp$ = this.store.select(selectInfoNecesidadCdp).subscribe(action2 => {
              if (action2 && action2.InfoNecesidadCdp) {
                this.infoNecesidadcdp = action2.InfoNecesidadCdp;
                this.fuentesAfectables = this.infoNecesidadcdp.Rubros[0].Fuentes;
                this.consultaGroup.patchValue({
                  descripcionCdp: this.infoNecesidadcdp.Necesidad.Objeto
                });
              }
            });
          }
        });
      }
    });
  }

  valorFuente() {
    this.valorFuenteAfectable = this.consultaGroup.value.fuentesAfectables.InfoFuente.ValorActual;
  }

  agregarFuente() {
    const aux = {
      fuenteAfectable: this.consultaGroup.value.fuentesAfectables.InfoFuente.Codigo + ' - ' + this.consultaGroup.value.fuentesAfectables.InfoFuente.Descripcion,
      valor: this.valorFuenteAfectable
    };
    this.datosTablaFuentes.push(aux);
    this.totalFuentes += aux.valor;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(LoadFilaSeleccionada(null));
    this.subscription$.unsubscribe();
    this.subVigencias$.unsubscribe();
  }

  createForm() {
    this.consultaGroup = this.fb.group({
      codigoDisponibilidad: [''/*,
        [Validators.required,
       Validators.pattern('^[0-9]*$')]*/
      ],
      codigoRegistro: [''/*,
      [Validators.required,
      Validators.pattern('^[0-9]*$')]*/
    ],
    vigencia: [''],
    aux: [''],
    descripcionCrp: [''],
    descripcionCdp: [''],
    fuentesAfectables: [''],
    });
  }

  saveForm() {
    if ( this.consultaGroup.invalid ) {
      return Object.values( this.consultaGroup.controls ).forEach( control => {
        control.markAsTouched();
      });
    }
  }

  // Evento con el boton mostrar datos en la tabla
  mostrarDatos() {
    const aux = {
      codigoPresupuestal: this.rubros,
      disponibilidad: this.consultaGroup.value.codigoDisponibilidad,
      registro: this.consultaGroup.value.codigoRegistro,
      concepto: this.infoRubros[0].data.Nombre,
      total: this.consultaGroup.value.aux.ValorActual
    };
    this.datosConsulta.push(aux);
    // this.store.dispatch()
  }

  // Modal acciones sobre la tabla: eliminar registros
  modalEliminar(fila: any) {
    this.modalService.open(this.eliminarDatoModal).result.then((result) => {
      if (`${result}`) {
        this.datosConsulta.splice(this.datosConsulta.findIndex(
          (element: any) => element.disponibilidad === fila.disponibilidad
          && element.registro === fila.registro
          ), 1);
          // this.store.dispatch()
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private _filter(value: any, crps: any): any[] {
    const filterValue = value;
    let filtro;
    try {
      filtro = crps.filter(crp => String((crp.Consecutivo)).toUpperCase().includes(filterValue.toUpperCase()));
    } catch (error) {
      this.aux = value;
      this.consultaGroup.patchValue({
        codigoRegistro: value.Consecutivo,
        aux: value
      });
      this.buscarInfoCrp();
    }
    return filtro;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
