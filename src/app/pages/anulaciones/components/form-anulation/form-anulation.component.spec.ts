import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAnulationComponent } from './form-anulation.component';

describe('FormAnulationComponent', () => {
  let component: FormAnulationComponent;
  let fixture: ComponentFixture<FormAnulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAnulationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAnulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
