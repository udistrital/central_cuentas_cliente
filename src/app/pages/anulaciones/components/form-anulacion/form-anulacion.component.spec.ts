import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAnulacionComponent } from './form-anulacion.component';

describe('FormAnulationComponent', () => {
  let component: FormAnulacionComponent;
  let fixture: ComponentFixture<FormAnulacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAnulacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAnulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
