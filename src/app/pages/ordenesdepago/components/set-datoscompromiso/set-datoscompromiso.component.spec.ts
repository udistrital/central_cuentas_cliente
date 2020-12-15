import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetDatoscompromisoComponent } from './set-datoscompromiso.component';

describe('SetDatoscompromisoComponent', () => {
  let component: SetDatoscompromisoComponent;
  let fixture: ComponentFixture<SetDatoscompromisoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetDatoscompromisoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetDatoscompromisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
