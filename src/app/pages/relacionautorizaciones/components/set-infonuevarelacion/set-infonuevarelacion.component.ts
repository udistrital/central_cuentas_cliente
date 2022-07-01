import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { getArl, getCajaCompensacion, getEps, getPension, getTiposCompromisos } from '../../../../shared/actions/shared.actions';
import { OPCIONES_AREA_FUNCIONAL } from '../../../../shared/interfaces/interfaces';
import { selectArl, selectCajaCompensacion, selectEps, selectPension, selectTiposCompromisos } from '../../../../shared/selectors/shared.selectors';
import { RelacionautorizacionesService } from '../../services/relacionautorizaciones.service';
import { getMonthList } from 'month-list';


@Component({
  selector: 'ngx-set-infonuevarelacion',
  templateUrl: './set-infonuevarelacion.component.html',
  styleUrls: ['./set-infonuevarelacion.component.scss']
})
export class SetInfonuevarelacionComponent implements OnInit {

  public inforelacionGroup: FormGroup;

  relacion: any = {};
  id: string;
  opcionesAreaFuncional: Array<any>;
  subSalud$: any;
  salud: any;
  subPension$: any;
  pension: any;
  subArl$: any;
  arl: any;
  subCajaCompensacion$: any;
  cajaCompensacion: any;
  subTipoCompromiso$: any;
  tipoCompromiso: any;
  subTiposCompromisos$: any;
  tiposCompromisos: any;
  meses: any;

  constructor( private fb: FormBuilder,
    private _relacionService: RelacionautorizacionesService,
    private activatedRoute: ActivatedRoute,
    private store: Store<any>,
    ) {
      this.store.dispatch(getEps({query: {TipoTerceroId__CodigoAbreviacion: 'EPS'}}));
      this.store.dispatch(getPension({query: {TipoTerceroId__CodigoAbreviacion: 'F_PENSION'}}));
      this.store.dispatch(getArl({query: {TipoTerceroId__CodigoAbreviacion: 'ARL'}}));
      this.store.dispatch(getCajaCompensacion({query: {TipoTerceroId__CodigoAbreviacion: 'CAJA_COMPENSACIÓN'}}));
      this.store.dispatch(getTiposCompromisos({query: {TipoParametroId__CodigoAbreviacion: 'TCP'}}));

    // Configuracion de enrutamiento de datos (nomina o seguridad social)
    this.activatedRoute.paramMap.subscribe( params => {
      this.relacion = this._relacionService.getTipoRelacion( params.get('id') );
      this.id = params.get('id');
    });

    this.createForm();
  }
  ngOnInit() {
    this.opcionesAreaFuncional = OPCIONES_AREA_FUNCIONAL;
    this.subSalud$ = this.store.select(selectEps).subscribe(action => {
      if (action && action.Eps) {
        this.salud = action.Eps;
        action.Eps = null;
      }
    });
    this.subPension$ = this.store.select(selectPension).subscribe(action => {
      if (action && action.Pension) {
        this.pension = action.Pension;
        action.Pension = null;
      }
    });
    this.subArl$ = this.store.select(selectArl).subscribe(action => {
      if (action && action.Arl) {
        this.arl = action.Arl;
        action.Arl = null;
      }
    });
    this.subCajaCompensacion$ = this.store.select(selectCajaCompensacion).subscribe(action => {
      if (action && action.CajaCompensacion) {
        this.cajaCompensacion = action.CajaCompensacion;
        action.CajaCompensacion = null;
      }
    });
    this.subTiposCompromisos$ = this.store.select(selectTiposCompromisos).subscribe((action) => {
      if (action && action.TiposCompromisos) {
        this.tiposCompromisos = action.TiposCompromisos;
      }
    });

    this.meses = getMonthList('es');

  }

  // Validacion del Formulario
  get fechaInvalid() {
    return this.inforelacionGroup.get('fechaRelacion').invalid && this.inforelacionGroup.get('fechaRelacion').touched;
  }
  get mesInvalid() {
    return this.inforelacionGroup.get('mes').invalid && this.inforelacionGroup.get('mes').touched;
  }
  get etiquetaInvalid() {
    return this.inforelacionGroup.get('etiqueta').invalid && this.inforelacionGroup.get('etiqueta').touched;
  }
  get numeroCompromisoInvalid() {
    return this.inforelacionGroup.get('numeroCompromiso').invalid && this.inforelacionGroup.get('numeroCompromiso').touched;
  }

  createForm() {
    this.inforelacionGroup = this.fb.group({
      numeroRelacion: ['001', ],
      tipoNomina: [''],
      salud: [''],
      periodoSalud: [''],
      pension: [''],
      periodoPension: [''],
      arl: [''],
      periodoArl: [''],
      cajaCompensacion: [''],
      periodoCajaCompensacion: [''],
      tipoCompromiso: [''],
      numeroCompromiso: ['']
    });
  }

  saveForm() {
    if ( this.inforelacionGroup.invalid ) {
      return Object.values( this.inforelacionGroup.controls ).forEach( control => {
        control.markAsTouched();
      });
    }
  }

  isInvalid(nombre: string) {
    const input = this.inforelacionGroup.get(nombre);
    if (input)
      return input.invalid && (input.touched || input.dirty);
    else
      return true;
  }

}
