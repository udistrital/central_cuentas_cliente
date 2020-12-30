import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperDevoluciontributariaComponent } from './stepper-devoluciontributaria.component';

describe('stepper-devoluciontributariaComponent', () => {
  let component: StepperDevoluciontributariaComponent;
  let fixture: ComponentFixture<StepperDevoluciontributariaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepperDevoluciontributariaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperDevoluciontributariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
