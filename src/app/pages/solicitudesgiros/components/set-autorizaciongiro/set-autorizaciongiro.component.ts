import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { getNodoSeleccionado, selectTiposID, selectDatosID, selectSolicitudesGiro, getRubro } from '../../../../shared/selectors/shared.selectors';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { getDatosID, obtenerRubro } from '../../../../shared/actions/shared.actions';
import { combineLatest } from 'rxjs';
import { loadAutorizaciongiro } from '../../actions/solicitudesgiros.actions';
import { ActivatedRoute } from '@angular/router';
import { ACCIONES_DISABLED, ACCIONES_EDI } from '../../interfaces/interfaces';


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
  tituloAccion: string;
  subSolicitudesGiro$: any;
  solicitudesGiro: any;
  subRubroVer$: any;
  rubroSeleccionado: any;
  ver: boolean;
  flag: boolean;
  acciones_edi: any;
  acciones_disabled: any;

  constructor(private fb: FormBuilder,
    private store: Store<any>,
    private activatedRoute: ActivatedRoute) {
    this.createForm();
    this.tiposID = [];
    this.acciones_edi = ACCIONES_EDI;
    this.acciones_disabled = ACCIONES_DISABLED;
    this.tituloAccion = this.activatedRoute.snapshot.url[0].path;
    this.ver = this.acciones_disabled.some(accion => accion === this.tituloAccion);
  }

  ngOnInit() {
    this.flag = true;
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

    this.subscriptionDatosId$ = this.store.select(selectDatosID, 'beneficiario').subscribe((action) => {
      if (action && action.datosId && action.datosId[0]) {
        this.datosID = action.datosId[0];
      }
    });

    this.subscriptionCambios$ = this.autorizacionGroup.valueChanges.subscribe((valor) => {
      if (this.autorizacionGroup.valid)
        this.store.dispatch(loadAutorizaciongiro({ autorizaciongiro: valor }));
    });

    if (this.acciones_edi.some(accion => accion === this.tituloAccion)) {
      this.subSolicitudesGiro$ = this.store.select(selectSolicitudesGiro).subscribe((accion) => {
        if (accion && accion.SolicitudesById) {
          this.solicitudesGiro = accion.SolicitudesById;
          this.tiposId();
        }
      });
    } else {
      this.tiposId();
    }
    this.getDatosID();
  }

  ngOnDestroy(): void {
    this.subscriptionTipoId$.unsubscribe();
    this.subscriptionDatosId$.unsubscribe();
    this.subscriptionfilter$.unsubscribe();
    this.subscriptionCambios$.unsubscribe();
    this.rubroSeleccionado = null;
  }

  getDatosID() {
    this.subscriptionfilter$ = combineLatest([
      this.autorizacionGroup.get('numeroId').valueChanges,
      this.autorizacionGroup.get('tipoId').valueChanges,
    ]).subscribe(([numeroId, tipoId]) => {
      if (numeroId && tipoId) {
        this.store.dispatch(getDatosID({ clave: 'beneficiario', numero: numeroId, tipo: tipoId.Id }));
      }
    });
  }

  tiposId() {
    if (this.flag) {
      this.subscriptionTipoId$ = this.store.select(selectTiposID).subscribe((action) => {
        if (action && action[0]) {
          this.tiposID = action[0];
          if (this.acciones_edi.some(accion => accion === this.tituloAccion)) this.subRubro();
        }
      });
    }
  }

  subRubro() {
    if (this.flag) {
      this.store.dispatch(obtenerRubro({codRubro: this.solicitudesGiro.Rubro}));
        this.subRubroVer$ = this.store.select(getRubro).subscribe((accion) => {
          if (accion && accion.Rubro) {
            this.rubroSeleccionado = accion.Rubro[0];
            this.setAutorizacionGiro();
          }
        });
    }
  }
  setAutorizacionGiro() {
    if (this.flag) {
      this.flag = false;
      this.autorizacionGroup.patchValue({
        tipoId: this.tiposID[this.tiposID.findIndex((e: any) => e.Id === this.solicitudesGiro.Tipo_Doc_Beneficiario)],
        numeroId: this.solicitudesGiro.Documento_Beneficiario,
        nombreBeneficiario: this.solicitudesGiro.Nombre_Beneficiario,
        valorLetras: this.solicitudesGiro.Valor_Letras,
        valorNumero: this.solicitudesGiro.Valor_Numeros,
        rubroSeleccionado: this.rubroSeleccionado
      });
    }
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

  isInvalid(nombre: string) {
    const input = this.autorizacionGroup.get(nombre);
    if (input)
      return input.invalid && (input.touched || input.dirty);
    else
      return true;
  }
}
