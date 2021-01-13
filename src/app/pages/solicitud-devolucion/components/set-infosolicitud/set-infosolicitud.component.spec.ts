import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetInfosolicitudComponent } from './set-infosolicitud.component';

describe('SetInfosolicitudComponent', () => {
  let component: SetInfosolicitudComponent;
  let fixture: ComponentFixture<SetInfosolicitudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetInfosolicitudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetInfosolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
