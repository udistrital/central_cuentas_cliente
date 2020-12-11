import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAutorizacionnominaComponent } from './table-autorizacionnomina.component';

describe('TableAutorizacionnominaComponent', () => {
  let component: TableAutorizacionnominaComponent;
  let fixture: ComponentFixture<TableAutorizacionnominaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableAutorizacionnominaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableAutorizacionnominaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
