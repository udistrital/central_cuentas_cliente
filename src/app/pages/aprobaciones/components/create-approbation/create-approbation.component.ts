import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-create-approbation',
  templateUrl: './create-approbation.component.html',
  styleUrls: ['./create-approbation.component.scss']
})
export class CreateApprobationComponent implements OnInit {
  
  @Input () nombreAprobacion: any;
  @Input () aprobaciones: any; 
  
  constructor(
    
  ) {
    
   }

  ngOnInit() {
    console.log(this.nombreAprobacion)
  }

}
