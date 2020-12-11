import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderApprobationComponent } from './order-approbation.component';

describe('OrderApprobationComponent', () => {
  let component: OrderApprobationComponent;
  let fixture: ComponentFixture<OrderApprobationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderApprobationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderApprobationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
