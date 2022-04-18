import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetImpuestosyretencionesComponent } from './set-impuestosyretenciones.component';

describe('SetImpuestosyretencionesComponent', () => {
  let component: SetImpuestosyretencionesComponent;
  let fixture: ComponentFixture<SetImpuestosyretencionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetImpuestosyretencionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetImpuestosyretencionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
