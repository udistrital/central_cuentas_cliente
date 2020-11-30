import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperSolicitudgiroComponent } from './stepper-solicitudgiro.component';

describe('stepper-solicitudgiroComponent', () => {
  let component: StepperSolicitudgiroComponent;
  let fixture: ComponentFixture<StepperSolicitudgiroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepperSolicitudgiroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperSolicitudgiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
