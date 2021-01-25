import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetInfosolicitanteComponent } from './set-infosolicitante.component';

describe('SetInfosolicitanteComponent', () => {
  let component: SetInfosolicitanteComponent;
  let fixture: ComponentFixture<SetInfosolicitanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetInfosolicitanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetInfosolicitanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
