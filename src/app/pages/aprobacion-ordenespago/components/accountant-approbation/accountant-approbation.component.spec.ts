import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountantApprobationComponent } from './accountant-approbation.component';

describe('AccountantApprobationComponent', () => {
  let component: AccountantApprobationComponent;
  let fixture: ComponentFixture<AccountantApprobationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountantApprobationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountantApprobationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
