import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { getVigencias } from '../../../../shared/actions/shared.actions';
import { selectVigenciasNoFuturas } from '../../../../shared/selectors/shared.selectors';
import { getAreaFuncional } from '../../selectors/ordenespago.selectors';

@Component({
  selector: 'ngx-set-datoscompromiso',
  templateUrl: './set-datoscompromiso.component.html',
  styleUrls: ['./set-datoscompromiso.component.scss']
})
export class SetDatoscompromisoComponent implements OnInit, OnDestroy {
  datosCompromiso: FormGroup;
  susVigencias$: any;
  vigencias: any;
  vigenciaActual: number;

  constructor(private fb: FormBuilder, private store: Store<any>) {
    this.vigencias = [];
    this.store.dispatch(getVigencias());
  }

  ngOnInit() {
    this.crearFormulario();
    this.susVigencias$ = combineLatest([
      this.store.select(selectVigenciasNoFuturas),
      this.store.select(getAreaFuncional)
    ]).subscribe(([accVigencias, accAreaFuncional]) => {
      if (accVigencias && accVigencias[0] && accAreaFuncional && accAreaFuncional.areaFuncional) {
        const vigenciaActual = accVigencias[0].find(vigencia => vigencia.estado === 'Actual');
        if (vigenciaActual)
          this.vigenciaActual = vigenciaActual.valor;
        this.vigencias = accVigencias[0]
          .filter(vigencia => vigencia.areaFuncional === String(accAreaFuncional.areaFuncional.Id));
      }
    });
  }

  ngOnDestroy() {
    this.susVigencias$.unsubscribe();
  }

  crearFormulario() {
    this.datosCompromiso = this.fb.group({
      compromiso: ['', Validators.required],
      numeroCompromiso: ['', [
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ]],
      vigencia: ['', Validators.required],
      tipoOrden: ['', Validators.required],
    });
  }

  get vigenciaSeleccionada() {
    return this.datosCompromiso.get('vigencia').value;
  }

  esInvalido(nombre: string) {
    const input = this.datosCompromiso.get(nombre);
    if (input)
      return input.invalid && (input.touched || input.dirty);
    else
      return true;
  }

  validarFormulario() {
    if (this.datosCompromiso.invalid) {
      return Object.values(this.datosCompromiso.controls).forEach(control => {
        control.markAsDirty();
      });
    }
  }
}
