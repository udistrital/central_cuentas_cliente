import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowResumenDevolucionTributariaComponent } from './show-resumendevoluciontributaria.component';

describe('ShowResumenDevolucionTributariaComponent', () => {
  let component: ShowResumenDevolucionTributariaComponent;
  let fixture: ComponentFixture<ShowResumenDevolucionTributariaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowResumenDevolucionTributariaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowResumenDevolucionTributariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
