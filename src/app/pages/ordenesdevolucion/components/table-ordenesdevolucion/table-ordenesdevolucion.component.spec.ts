import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOrdenesdevolucionComponent } from './table-ordenesdevolucion.component';

describe('TableOrdenesdevolucionComponent', () => {
  let component: TableOrdenesdevolucionComponent;
  let fixture: ComponentFixture<TableOrdenesdevolucionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableOrdenesdevolucionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableOrdenesdevolucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
