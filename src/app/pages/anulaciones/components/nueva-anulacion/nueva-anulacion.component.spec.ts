import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaAnulacionComponent } from './nueva-anulacion.component';

describe('OrderAnulationComponent', () => {
  let component: NuevaAnulacionComponent;
  let fixture: ComponentFixture<NuevaAnulacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaAnulacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaAnulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
