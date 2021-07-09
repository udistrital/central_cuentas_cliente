import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAnulacionComponent } from './crear-anulacion.component';

describe('CreateAnulationComponent', () => {
  let component: CrearAnulacionComponent;
  let fixture: ComponentFixture<CrearAnulacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearAnulacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearAnulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
