import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-form-document',
  templateUrl: './form-document.component.html',
  styleUrls: ['./form-document.component.scss']
})
export class FormDocumentComponent implements OnInit {
  @Output () primerForm: EventEmitter <any>;

  oficioForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.primerForm = new EventEmitter;
   }

  ngOnInit() {
    this.oficioForm = this.formBuilder.group({
      oficio: ['', Validators.required],
      fecha: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
    this.handleFormChanges();
  }

  handleFormChanges() {
    this.oficioForm.statusChanges.subscribe(
      (result: any) => {if (result === 'VALID') {
        this.primerForm.emit(true);
        } else if (result === 'INVALID') {
          this.primerForm.emit(false);
        }
      }
    );
  }

  onSubmit (data: any) {

  }

}
