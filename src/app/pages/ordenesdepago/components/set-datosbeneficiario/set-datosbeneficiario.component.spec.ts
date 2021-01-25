import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetDatosbeneficiarioComponent } from './set-datosbeneficiario.component';

describe('SetDatosbeneficiarioComponent', () => {
  let component: SetDatosbeneficiarioComponent;
  let fixture: ComponentFixture<SetDatosbeneficiarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetDatosbeneficiarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetDatosbeneficiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
