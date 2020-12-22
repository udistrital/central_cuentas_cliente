import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleInfoPagoComponent } from './detalle-info-pago.component';

describe('DetailStepDosComponent', () => {
  let component: DetalleInfoPagoComponent;
  let fixture: ComponentFixture<DetalleInfoPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleInfoPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleInfoPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
