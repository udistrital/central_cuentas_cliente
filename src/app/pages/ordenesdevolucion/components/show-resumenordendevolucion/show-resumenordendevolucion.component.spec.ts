import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowResumenordendevolucionComponent } from './show-resumenordendevolucion.component';

describe('ShowResumenordendevolucionComponent', () => {
  let component: ShowResumenordendevolucionComponent;
  let fixture: ComponentFixture<ShowResumenordendevolucionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowResumenordendevolucionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowResumenordendevolucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
