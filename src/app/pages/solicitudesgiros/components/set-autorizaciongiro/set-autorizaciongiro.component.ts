import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { getNodoSeleccionado, selectTiposID, selectDatosID } from '../../../../shared/selectors/shared.selectors';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { getDatosID } from '../../../../shared/actions/shared.actions';
import { combineLatest } from 'rxjs';
import { loadAutorizaciongiro } from '../../actions/solicitudesgiros.actions';

@Component({
  selector: 'ngx-set-autorizaciongiro',
  templateUrl: './set-autorizaciongiro.component.html',
  styleUrls: ['./set-autorizaciongiro.component.scss']
})
export class SetAutorizaciongiroComponent implements OnInit, OnDestroy {

  // Formulario
  autorizacionGroup: FormGroup;

  // Consulta y envio de datos a Store
  subscription$: any;
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

    // Seleccionar Rubro
    this.subscription$ = this.store.select(getNodoSeleccionado).subscribe((nodo: any) => {
      if (nodo) {
        if (Object.keys(nodo)[0] === 'type') {
          // hay que crear un delay porque el cambio se efectua antes de renderizar la vista
          setTimeout(() => {
            this.autorizacionGroup.get('rubroSeleccionado').setValue(null);
          });
        } else {
          if (!nodo.children) {
            this.autorizacionGroup.get('rubroSeleccionado').setValue(nodo);
          }
        }
      }
    });

    // Cargar datos Tipo ID y Numero ID
    this.subscriptionTipoId$ = this.store.select(selectTiposID).subscribe((action) => {
      if (action && action[0]) {
        this.tiposID = action[0];
      }
    });

    this.subscriptionDatosId$ = this.store.select(selectDatosID, 'beneficiario').subscribe((action) => {
      if (action && action.datosId && action.datosId[0]) {
        this.datosID = action.datosId[0];
      }
    });

    this.subscriptionfilter$ = combineLatest([
      this.autorizacionGroup.get('numeroId').valueChanges,
      this.autorizacionGroup.get('tipoId').valueChanges,
    ]).subscribe(([numeroId, tipoId]) => {
      if (numeroId && tipoId) {
        this.store.dispatch(getDatosID({ clave: 'beneficiario', numero: numeroId, tipo: tipoId.Id }));
      }
    });

    this.subscriptionCambios$ = this.autorizacionGroup.valueChanges.subscribe((valor) => {
      if (this.autorizacionGroup.valid)
        this.store.dispatch(loadAutorizaciongiro({ autorizaciongiro: valor }));
    });
  }

  ngOnDestroy(): void {
    this.subscriptionTipoId$.unsubscribe();
    this.subscriptionDatosId$.unsubscribe();
    this.subscriptionfilter$.unsubscribe();
    this.subscriptionCambios$.unsubscribe();
  }

  // Validacion del Formulario
  get tipoIdInvalid() {
    return this.autorizacionGroup.get('tipoId').invalid && this.autorizacionGroup.get('tipoId').touched;
  }
  get numeroIdInvalid() {
    return this.autorizacionGroup.get('numeroId').invalid && this.autorizacionGroup.get('numeroId').touched;
  }
  get rubroInvalid() {
    return this.autorizacionGroup.get('rubroSeleccionado').invalid && this.autorizacionGroup.get('rubroSeleccionado').touched;
  }
  get valorLetrasInvalid() {
    return this.autorizacionGroup.get('valorLetras').invalid && this.autorizacionGroup.get('valorLetras').touched;
  }
  get valorNumeroInvalid() {
    return this.autorizacionGroup.get('valorNumero').invalid && this.autorizacionGroup.get('valorNumero').touched;
  }

  createForm() {
    this.autorizacionGroup = this.fb.group({
      tipoId: ['', Validators.required],
      numeroId: ['',
        [Validators.required,
        Validators.pattern('^[0-9]*$')]
      ],
      nombreBeneficiario: [''],
      rubroSeleccionado: [null, Validators.required],
      valorLetras: ['', Validators.required],
      valorNumero: ['',
        [Validators.required,
        Validators.pattern('^[1-9]*\d{0,7}(?:\.\d{1,4})?|\.\d{1,4}$')]]
    });
  }

  saveForm() {
    if (this.autorizacionGroup.invalid) {
      return Object.values(this.autorizacionGroup.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
}
