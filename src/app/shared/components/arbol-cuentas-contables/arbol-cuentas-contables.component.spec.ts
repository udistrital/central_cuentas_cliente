import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbolCuentasContablesComponent } from './arbol-cuentas-contables.component';

describe('ArbolCuentasContablesComponent', () => {
  let component: ArbolCuentasContablesComponent;
  let fixture: ComponentFixture<ArbolCuentasContablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArbolCuentasContablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbolCuentasContablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
