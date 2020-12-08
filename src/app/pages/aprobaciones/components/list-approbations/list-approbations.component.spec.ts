import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListApprobationsComponent } from './list-approbations.component';

describe('ListApprobationsComponent', () => {
  let component: ListApprobationsComponent;
  let fixture: ComponentFixture<ListApprobationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListApprobationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListApprobationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
