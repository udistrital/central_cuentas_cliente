import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetAutorizaciongiroComponent } from './set-autorizaciongiro.component';

describe('SetAutorizaciongiroComponent', () => {
  let component: SetAutorizaciongiroComponent;
  let fixture: ComponentFixture<SetAutorizaciongiroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetAutorizaciongiroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetAutorizaciongiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
