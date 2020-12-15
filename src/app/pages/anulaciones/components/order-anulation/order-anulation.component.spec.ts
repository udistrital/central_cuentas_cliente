import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAnulationComponent } from './order-anulation.component';

describe('OrderAnulationComponent', () => {
  let component: OrderAnulationComponent;
  let fixture: ComponentFixture<OrderAnulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderAnulationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderAnulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
