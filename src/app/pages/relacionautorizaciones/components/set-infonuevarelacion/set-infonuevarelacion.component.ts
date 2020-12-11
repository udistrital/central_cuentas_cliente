import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RelacionautorizacionesService } from '../../services/relacionautorizaciones.service';


@Component({
  selector: 'ngx-set-infonuevarelacion',
  templateUrl: './set-infonuevarelacion.component.html',
  styleUrls: ['./set-infonuevarelacion.component.scss']
})
export class SetInfonuevarelacionComponent {

  public inforelacionGroup: FormGroup;

  relacion: any = {};
  id: string;

  constructor( private fb: FormBuilder,     
    private _relacionService: RelacionautorizacionesService,
    private activatedRoute: ActivatedRoute) {

    // Configuracion de enrutamiento de datos (nomina o seguridad social)
    this.activatedRoute.paramMap.subscribe( params => {
      this.relacion = this._relacionService.getTipoRelacion( params.get('id') );
      this.id = params.get('id');
    });

    this.createForm();
  }

  // Validacion del Formulario
  get fechaInvalid() {
    return this.inforelacionGroup.get('fechaRelacion').invalid && this.inforelacionGroup.get('fechaRelacion').touched;
  }
  get mesInvalid() {
    return this.inforelacionGroup.get('mes').invalid && this.inforelacionGroup.get('mes').touched;
  }
  get quincenaInvalid() {
    return this.inforelacionGroup.get('quincena').invalid && this.inforelacionGroup.get('quincena').touched;
  }
  get numeroCompromisoInvalid() {
    return this.inforelacionGroup.get('numeroCompromiso').invalid && this.inforelacionGroup.get('numeroCompromiso').touched;
  }

  createForm() {
    this.inforelacionGroup = this.fb.group({
      numeroRelacion: ['001', ],
      fechaRelacion: ['', Validators.required],
      mes: ['', Validators.required],
      quincena: ['',
      [Validators.required,
        Validators.pattern('^[0-9]*$')]],
      numeroCompromiso: ['', Validators.required],
      tipoCompromiso: ['', ],
    });
  }

  saveForm() {
    if ( this.inforelacionGroup.invalid ) {
      return Object.values( this.inforelacionGroup.controls ).forEach( control => {
        control.markAsTouched();
      });
    }
  }

}
