import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { getAccionTabla, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { loadSolicitudgiroSeleccionado } from '../../actions/solicitudesgiros.actions';
import { CONFIGURACION_DOCUMENTOS, DATOS_DOCUMENTOS } from '../../interfaces/interfaces';

// export interface UploadData {
//   nameDocs: string;
//   stateDocs: string;
//   changeDocs: string;
// }

// const ELEMENT_DATA: UploadData[] = [
//   {
//     nameDocs: 'documento1',
//     stateDocs: 'Listo',
//     changeDocs: 'Borrar'
//   },
//   {
//     nameDocs: 'documento2',
//     stateDocs: 'CARGAR',
//     changeDocs: 'Borrar'
//   },
//   {
//     nameDocs: 'documento3',
//     stateDocs: 'CARGAR',
//     changeDocs: 'Borrar'  },
// ];

@Component({
  selector: 'ngx-set-cargardocumentos',
  templateUrl: './set-cargardocumentos.component.html',
  styleUrls: ['./set-cargardocumentos.component.scss']
})
export class SetCargardocumentosComponent implements OnInit {

  configuracion: any;
  datosDocumentos: any;
  subscription$: any;

  documentosGroup: FormGroup;

  // displayedColumns: string[] = ['nameDocs', 'stateDocs', 'changeDocs'];
  // dataSource = ELEMENT_DATA;

  constructor(private store: Store<any>, private fb: FormBuilder, config: NgbModalConfig, private modalService: NgbModal) {

    this.datosDocumentos = DATOS_DOCUMENTOS;
    this.configuracion = CONFIGURACION_DOCUMENTOS;

    config.backdrop = 'static';
    config.keyboard = false;

    this.createForm();
   }

  ngOnInit() {

    this.subscription$ = this.store.select(getFilaSeleccionada).subscribe((fila: any) => {

      if (fila) {

        this.store.dispatch(loadSolicitudgiroSeleccionado(fila.fila));
      }
    });
    this.subscription$ = this.store.select(getAccionTabla).subscribe((accion: any) => {

      this.store.dispatch(loadSolicitudgiroSeleccionado(null));
    });

  }


  open(content) {
    this.modalService.open(content);
  }

  createForm() {
    this.documentosGroup = this.fb.group({
      documentos: new FormControl('', [Validators.required]),
    });
  }

  saveForm() {
    if ( this.documentosGroup.invalid ) {
      return Object.values( this.documentosGroup.controls ).forEach( control => {
        control.markAsTouched();
      });
    }
  }
}
