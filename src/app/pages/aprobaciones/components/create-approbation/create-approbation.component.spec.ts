import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateApprobationComponent } from './create-approbation.component';

describe('CreateApprobationComponent', () => {
  let component: CreateApprobationComponent;
  let fixture: ComponentFixture<CreateApprobationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateApprobationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateApprobationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
