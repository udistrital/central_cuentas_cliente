import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleInfoPresupuestalComponent } from './detalle-info-presupuestal.component';

describe('DetailStepTresComponent', () => {
  let component: DetalleInfoPresupuestalComponent;
  let fixture: ComponentFixture<DetalleInfoPresupuestalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleInfoPresupuestalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleInfoPresupuestalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
