import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearOrdenpagoComponent } from './crear-ordenpago.component';

describe('CrearOrdenpagoComponent', () => {
  let component: CrearOrdenpagoComponent;
  let fixture: ComponentFixture<CrearOrdenpagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearOrdenpagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearOrdenpagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
