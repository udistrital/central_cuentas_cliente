import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearSolicitudesDevolucionComponent } from './crear-solicitudes-devolucion.component';

describe('CrearSolicitudesDevolucionComponent', () => {
  let component: CrearSolicitudesDevolucionComponent;
  let fixture: ComponentFixture<CrearSolicitudesDevolucionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearSolicitudesDevolucionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearSolicitudesDevolucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
