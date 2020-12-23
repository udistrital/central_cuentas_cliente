import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleInfoFinancieraComponent } from './detalle-info-financiera.component';

describe('DetailStepCuatroComponent', () => {
  let component: DetalleInfoFinancieraComponent;
  let fixture: ComponentFixture<DetalleInfoFinancieraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleInfoFinancieraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleInfoFinancieraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
