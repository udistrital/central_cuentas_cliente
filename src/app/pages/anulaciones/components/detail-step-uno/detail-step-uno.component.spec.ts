import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailStepUnoComponent } from './detail-step-uno.component';

describe('DetailStepUnoComponent', () => {
  let component: DetailStepUnoComponent;
  let fixture: ComponentFixture<DetailStepUnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailStepUnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailStepUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
