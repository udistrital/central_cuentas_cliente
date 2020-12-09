import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowResumenordenpagoComponent } from './show-resumenordenpago.component';

describe('ShowResumenordenpagoComponent', () => {
  let component: ShowResumenordenpagoComponent;
  let fixture: ComponentFixture<ShowResumenordenpagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowResumenordenpagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowResumenordenpagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
