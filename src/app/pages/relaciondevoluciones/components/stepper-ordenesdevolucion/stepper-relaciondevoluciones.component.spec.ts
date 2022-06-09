import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StepperRelacionDevolucionComponent } from './stepper-relaciondevoluciones.component';

describe('StepperOrdenesdevolucionComponent', () => {
  let component: StepperRelacionDevolucionComponent;
  let fixture: ComponentFixture<StepperRelacionDevolucionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepperRelacionDevolucionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperRelacionDevolucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
