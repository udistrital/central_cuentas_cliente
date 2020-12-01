import { Component, Input, OnInit, Output } from '@angular/core';
import {ViewChild, AfterViewInit} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'ngx-rechazar',
  templateUrl: './rechazar.component.html',
  styleUrls: ['./rechazar.component.scss']
})
export class RechazarComponent implements OnInit, AfterViewInit {

  modal : NgbModalRef;

  @Output() rechazarFormulario: boolean;

  @ViewChild('modalRecha', {static: false}) modalContenido: any;
  
  ngAfterViewInit(){
    this.abrir();
  }

  constructor(
    private modalService: NgbModal) { }

  ngOnInit(){
    
  }

  abrir() {
    this.modal = this.modalService.open(this.modalContenido);
  }

  cerrar (){
    this.modal.close();
    this.rechazarFormulario = false;
  }
}
