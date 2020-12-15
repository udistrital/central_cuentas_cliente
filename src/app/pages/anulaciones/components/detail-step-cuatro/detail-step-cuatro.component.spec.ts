import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailStepCuatroComponent } from './detail-step-cuatro.component';

describe('DetailStepCuatroComponent', () => {
  let component: DetailStepCuatroComponent;
  let fixture: ComponentFixture<DetailStepCuatroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailStepCuatroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailStepCuatroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
