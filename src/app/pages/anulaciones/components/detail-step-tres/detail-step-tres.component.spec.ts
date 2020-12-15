import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailStepTresComponent } from './detail-step-tres.component';

describe('DetailStepTresComponent', () => {
  let component: DetailStepTresComponent;
  let fixture: ComponentFixture<DetailStepTresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailStepTresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailStepTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
