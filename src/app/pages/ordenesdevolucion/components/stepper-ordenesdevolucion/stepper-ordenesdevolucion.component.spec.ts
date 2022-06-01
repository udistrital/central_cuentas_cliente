import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperOrdenesdevolucionComponent } from './stepper-ordenesdevolucion.component';

describe('StepperOrdenesdevolucionComponent', () => {
  let component: StepperOrdenesdevolucionComponent;
  let fixture: ComponentFixture<StepperOrdenesdevolucionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepperOrdenesdevolucionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperOrdenesdevolucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
