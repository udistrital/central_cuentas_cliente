import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleActaComponent } from './detalle-acta.component';

describe('DetailStepUnoComponent', () => {
  let component: DetalleActaComponent;
  let fixture: ComponentFixture<DetalleActaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleActaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleActaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
