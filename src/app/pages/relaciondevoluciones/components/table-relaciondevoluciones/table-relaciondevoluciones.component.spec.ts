import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRelaciondevolucionesComponent } from './table-relaciondevoluciones.component';

describe('TableRelaciondevolucionesComponent', () => {
  let component: TableRelaciondevolucionesComponent;
  let fixture: ComponentFixture<TableRelaciondevolucionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableRelaciondevolucionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableRelaciondevolucionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
