import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetRelaciondevolucionesComponent } from './set-relaciondevoluciones.component';

describe('SetRelaciondevolucionesComponent', () => {
  let component: SetRelaciondevolucionesComponent;
  let fixture: ComponentFixture<SetRelaciondevolucionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetRelaciondevolucionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetRelaciondevolucionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
