import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetInfosolicitudgiroComponent } from './set-infosolicitudgiro.component';

describe('SetInfosolicitudgiroComponent', () => {
  let component: SetInfosolicitudgiroComponent;
  let fixture: ComponentFixture<SetInfosolicitudgiroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetInfosolicitudgiroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetInfosolicitudgiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
