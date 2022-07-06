/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SetContabilizacionordenpagoComponent } from './set-contabilizacionordenpago.component';

describe('SetContabilizacionordenpagoComponent', () => {
  let component: SetContabilizacionordenpagoComponent;
  let fixture: ComponentFixture<SetContabilizacionordenpagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetContabilizacionordenpagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetContabilizacionordenpagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
