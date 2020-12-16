import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetApprobationComponent } from './budget-approbation.component';

describe('BudgetApprobationComponent', () => {
  let component: BudgetApprobationComponent;
  let fixture: ComponentFixture<BudgetApprobationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetApprobationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetApprobationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
