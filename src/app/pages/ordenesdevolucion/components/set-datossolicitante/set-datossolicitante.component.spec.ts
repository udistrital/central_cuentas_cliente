import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetDatossolicitanteComponent } from './set-datossolicitante.component';

describe('SetDatossolicitanteComponent', () => {
  let component: SetDatossolicitanteComponent;
  let fixture: ComponentFixture<SetDatossolicitanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetDatossolicitanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetDatossolicitanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
