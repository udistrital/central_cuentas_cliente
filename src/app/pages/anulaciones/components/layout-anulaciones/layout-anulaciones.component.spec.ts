import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutAnulacionesComponent } from './layout-anulaciones.component';

describe('LayoutAnulacionesComponent', () => {
  let component: LayoutAnulacionesComponent;
  let fixture: ComponentFixture<LayoutAnulacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutAnulacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutAnulacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
