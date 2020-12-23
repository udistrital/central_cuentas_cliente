import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOficioComponent } from './form-oficio.component';

describe('FormDocumentComponent', () => {
  let component: FormOficioComponent;
  let fixture: ComponentFixture<FormOficioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormOficioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormOficioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
