import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getConceptos, getDatosID, getSolicitudesById } from '../../../../shared/actions/shared.actions';
import { selectTiposID, selectDatosID, selectConceptos, selectSolicitudesGiro } from '../../../../shared/selectors/shared.selectors';
import { combineLatest } from 'rxjs';
import { loadInfosolicitudgiro } from '../../actions/solicitudesgiros.actions';
import { OPCIONES_AREA_FUNCIONAL } from '../../../../shared/interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../@core/data/users.service';
import { ACCIONES_DISABLED, ACCIONES_EDI } from '../../interfaces/interfaces';


@Component({
  selector: 'ngx-set-infosolicitudgiro',
  templateUrl: './set-infosolicitudgiro.component.html',
  styleUrls: ['./set-infosolicitudgiro.component.scss']
})
export class SetInfosolicitudgiroComponent implements OnInit, OnDestroy {

  // Formulario
  infoSolicitudGroup: FormGroup;
  // Envio de datos al Store
  subscriptionTipoId$: any;
  subscriptionDatosId$: any;
  subscriptionfilter$: any;
  subscriptionCambios$: any;
  tiposID: any;
  datosID: any;
  opcionesAreaFuncional: any;
  conceptos: any;
  subConceptos$: any;
  info_token: any;
  rol: any;
  tituloAccion: string;
  subSolicitudesGiro$: any;
  solicitudesGiro: any;
  ver: boolean;

  constructor(private fb: FormBuilder,
    private store: Store<any>,
    private activatedRoute: ActivatedRoute,
    private userService: UserService) {
    this.createForm();
    this.tiposID = [];
    this.opcionesAreaFuncional = OPCIONES_AREA_FUNCIONAL;
    this.store.dispatch(getConceptos({query: {TipoParametroId__CodigoAbreviacion: 'CON'}}));
    this.tituloAccion = this.activatedRoute.snapshot.url[0].path;
    this.ver = ACCIONES_DISABLED.some(accion => accion === this.tituloAccion);
  }

  ngOnInit() {
    this.info_token = this.userService.getTokenData();
    if (this.info_token) {
      this.rol = this.info_token.role.includes('SUPERVISOR');
      if (this.rol) {
        this.infoSolicitudGroup.patchValue({
          cargo: 'ORDENADOR DEL GASTO'
        });
      }
    }
    this.subscriptionTipoId$ = this.store.select(selectTiposID).subscribe((action) => {
      if (action && action[0]) {
        this.tiposID = action[0];
      }
    });

    this.subscriptionDatosId$ = this.store.select(selectDatosID, 'solicitante').subscribe((action) => {
      if (action && action.datosId && action.datosId[0]) {
        this.datosID = action.datosId[0];
        this.infoSolicitudGroup.patchValue({
          tipoId: this.tiposID[this.tiposID.findIndex((e: any) => e.Id === this.datosID.TipoDocumentoId.Id)],
          numeroId: this.info_token.documento
        });
      }
    });

    if (ACCIONES_EDI.some(accion => accion === this.tituloAccion)) {
      this.store.dispatch(getSolicitudesById({id: this.activatedRoute.snapshot.url[1].path}));
      this.subSolicitudesGiro$ = this.store.select(selectSolicitudesGiro).subscribe((accion) => {
        if (accion && accion.SolicitudesById) {
          this.solicitudesGiro = accion.SolicitudesById;
          this.conceptosSolicitud();
        }
      });
    }
    this.store.dispatch(getDatosID({ clave: 'solicitante', numero: this.info_token.documento}));


    // Consulta cambios en los datos para enviar al store
    this.subscriptionCambios$ = this.infoSolicitudGroup.valueChanges.subscribe((valor) => {
      if (this.infoSolicitudGroup.valid)
        this.store.dispatch(loadInfosolicitudgiro({ infosolicitud: valor }));
    });
    this.conceptosSolicitud();
  }

  conceptosSolicitud() {
    this.subConceptos$ = this.store.select(selectConceptos).subscribe((accion) => {
      if (accion && accion.Conceptos) {
        this.conceptos = accion.Conceptos;
        if (ACCIONES_EDI.some(accion1 => accion1 === this.tituloAccion)) this.setSolicitudesGiro();
      }
    });
  }
  setSolicitudesGiro() {
    if (this.solicitudesGiro) {
      this.infoSolicitudGroup.patchValue({
        concepto: this.conceptos[this.conceptos.findIndex((e: any) => e.Id === this.solicitudesGiro.Concepto)],
        areaFuncional: this.opcionesAreaFuncional[this.opcionesAreaFuncional.findIndex((e: any) => e.Id === this.solicitudesGiro.Area_Funcional)],
        numeroSolicitud: this.solicitudesGiro.Numero_Solicitud
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptionTipoId$.unsubscribe();
    this.subscriptionDatosId$.unsubscribe();
    this.subscriptionCambios$.unsubscribe();
    this.subConceptos$.unsubscribe();
  }

  // Validacion del Formulario
  get conceptoInvalid() {
    return this.infoSolicitudGroup.get('concepto').invalid && this.infoSolicitudGroup.get('concepto').touched;
  }
  get areaInvalid() {
    return this.infoSolicitudGroup.get('areaFuncional').invalid && this.infoSolicitudGroup.get('areaFuncional').touched;
  }
  get tipoIdInvalid() {
    return this.infoSolicitudGroup.get('tipoId').invalid && this.infoSolicitudGroup.get('tipoId').touched;
  }
  get numeroIdInvalid() {
    return this.infoSolicitudGroup.get('numeroId').invalid && this.infoSolicitudGroup.get('numeroId').touched;
  }
  get cargoInvalid() {
    return this.infoSolicitudGroup.get('cargo').invalid && this.infoSolicitudGroup.get('cargo').touched;
  }

  isInvalid(nombre: string) {
    const input = this.infoSolicitudGroup.get(nombre);
    if (input)
      return input.invalid && (input.touched || input.dirty);
    else
      return true;
  }

  createForm() {
    this.infoSolicitudGroup = this.fb.group({
      concepto: ['', Validators.required],
      numeroSolicitud: [''],
      areaFuncional: ['', Validators.required],
      fechaSolicitud: [''],
      tipoId: ['', Validators.required],
      numeroId: ['',
        [Validators.required,
        Validators.pattern('^[0-9]*$')]],
      nombres: [''],
      apellidos: [''],
      cargo: ['', Validators.required],

    });
  }

  saveForm() {
    if (this.infoSolicitudGroup.invalid) {
      return Object.values(this.infoSolicitudGroup.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

}
