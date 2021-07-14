import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getDatosID } from '../../../../shared/actions/shared.actions';
import { selectTiposID, selectDatosID } from '../../../../shared/selectors/shared.selectors';
import { combineLatest } from 'rxjs';
import { loadInfosolicitudgiro } from '../../actions/solicitudesgiros.actions';


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

  constructor(private fb: FormBuilder, private store: Store<any>) {

    this.createForm();
    this.tiposID = [];
  }

  ngOnInit() {

    this.subscriptionTipoId$ = this.store.select(selectTiposID).subscribe((action) => {
      if (action && action[0]) {
        this.tiposID = action[0];
      }
    });

    this.subscriptionDatosId$ = this.store.select(selectDatosID, 'solicitante').subscribe((action) => {
      if (action && action.datosId && action.datosId[0]) {
        this.datosID = action.datosId[0];
      }
    });

    this.subscriptionfilter$ = combineLatest([
      this.infoSolicitudGroup.get('numeroId').valueChanges,
      this.infoSolicitudGroup.get('tipoId').valueChanges,
    ]).subscribe(([numeroId, tipoId]) => {
      if (numeroId && tipoId) {
        this.store.dispatch(getDatosID({ clave: 'solicitante', numero: numeroId, tipo: tipoId.Id }));
      }
    });

    // Consulta cambios en los datos para enviar al store
    this.subscriptionCambios$ = this.infoSolicitudGroup.valueChanges.subscribe((valor) => {
      console.log(valor);
      if (this.infoSolicitudGroup.valid)
        this.store.dispatch(loadInfosolicitudgiro({ infosolicitud: valor }));
    });

  }

  ngOnDestroy(): void {
    this.subscriptionTipoId$.unsubscribe();
    this.subscriptionDatosId$.unsubscribe();
    this.subscriptionfilter$.unsubscribe();
    this.subscriptionCambios$.unsubscribe();
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

  createForm() {
    this.infoSolicitudGroup = this.fb.group({
      concepto: ['', Validators.required],
      numeroSolicitud: ['001'],
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
