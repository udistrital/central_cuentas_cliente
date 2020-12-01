import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { DATOS_CREACION } from "../../interfaces/interfaces";
import { getDatosIniciales } from '../../selectors/aprobaciones.selectors';
@Component({
  selector: 'ngx-relation-approbation',
  templateUrl: './relation-approbation.component.html',
  styleUrls: ['./relation-approbation.component.scss']
})
export class RelationApprobationComponent implements OnInit, OnDestroy {

  
  @Input() rechazarFormulario: boolean = false;

  nAprobacion: any;
  titles: String[] = ['Área funcional','Vigencia','Mes','Consecutivo','Estado'];
  attributes: any[] = [['areaFuncional'],['vigencia'],['mes'],['consecutivo'],['estado']];
  datosCreacion: any;
  subscription$: any;
  aprobacionContable = {};
  

  constructor( 
    private store: Store<any>,
  ) { 
    this.datosCreacion = DATOS_CREACION;
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  ngOnInit() {
    this.subscription$ = this.store.select(getDatosIniciales).subscribe(data=>{
      if(data !== null){
        this.nAprobacion = data.nAprobacion;
    }
    })
  }

  rechazar(){
    this.rechazarFormulario = true;
    console.log(this.rechazarFormulario);
  }

  aceptar () {
  
  }
}
