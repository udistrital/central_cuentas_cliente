import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAnulationComponent } from './create-anulation.component';

describe('CreateAnulationComponent', () => {
  let component: CreateAnulationComponent;
  let fixture: ComponentFixture<CreateAnulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAnulationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAnulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
