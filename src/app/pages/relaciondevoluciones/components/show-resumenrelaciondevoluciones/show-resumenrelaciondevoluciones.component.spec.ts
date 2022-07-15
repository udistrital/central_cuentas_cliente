import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowResumenRelacionDevolucionesComponent } from './show-resumenrelaciondevoluciones.component';

describe('ShowResumenordendevolucionComponent', () => {
  let component: ShowResumenRelacionDevolucionesComponent;
  let fixture: ComponentFixture<ShowResumenRelacionDevolucionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowResumenRelacionDevolucionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowResumenRelacionDevolucionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
