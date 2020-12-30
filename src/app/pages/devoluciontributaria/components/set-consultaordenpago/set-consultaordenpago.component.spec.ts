import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetConsultaordenpagoComponent } from './set-consultaordenpago.component';

describe('SetConsultaordenpagoComponent', () => {
  let component: SetConsultaordenpagoComponent;
  let fixture: ComponentFixture<SetConsultaordenpagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetConsultaordenpagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetConsultaordenpagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
