import { Component, OnInit, OnDestroy, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { DATOS_CREACION } from "../../interfaces/interfaces";
import { getDatosIniciales } from '../../selectors/aprobaciones.selectors';
import { FormService } from '../../services/form.service';
@Component({
  selector: 'ngx-relation-approbation',
  templateUrl: './relation-approbation.component.html',
  styleUrls: ['./relation-approbation.component.scss']
})
export class RelationApprobationComponent implements OnInit, OnDestroy {
  
  nAprobacion: any;
  titles: String[] = ['Área funcional','Vigencia','Mes','Consecutivo','Estado'];
  attributes: any[] = [['areaFuncional'],['vigencia'],['mes'],['consecutivo'],['estado']];
  datosCreacion: any;
  subscription$: any;
  aprobacionContable = {};
  

  constructor( 
    private store: Store<any>,
    private form: FormService
  ) { 
    this.datosCreacion = DATOS_CREACION;
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  ngOnInit() {
    this.form.rechazarFormulario = false;
    this.subscription$ = this.store.select(getDatosIniciales).subscribe(data=>{
      if(data !== null){
        this.nAprobacion = data.nAprobacion;
    }
    })
  }

  rechazarAprobacion (){
    this.form.rechazarFormulario = true; 
  }

  aceptarAprobacion () {
  
  }
}
