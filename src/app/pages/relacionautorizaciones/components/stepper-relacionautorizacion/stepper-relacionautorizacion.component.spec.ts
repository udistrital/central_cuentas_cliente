import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperRelacionautorizacionComponent } from './stepper-relacionautorizacion.component';

describe('stepper-relacionautorizacion.component', () => {
  let component: StepperRelacionautorizacionComponent;
  let fixture: ComponentFixture<StepperRelacionautorizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepperRelacionautorizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperRelacionautorizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
