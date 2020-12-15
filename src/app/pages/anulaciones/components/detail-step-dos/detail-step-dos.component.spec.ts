import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailStepDosComponent } from './detail-step-dos.component';

describe('DetailStepDosComponent', () => {
  let component: DetailStepDosComponent;
  let fixture: ComponentFixture<DetailStepDosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailStepDosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailStepDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
