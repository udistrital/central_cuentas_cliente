import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSolicitudesDevolucionComponent } from './table-solicitudes-devolucion.component';

describe('TableSolicitudesDevolucionComponent', () => {
  let component: TableSolicitudesDevolucionComponent;
  let fixture: ComponentFixture<TableSolicitudesDevolucionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableSolicitudesDevolucionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSolicitudesDevolucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
