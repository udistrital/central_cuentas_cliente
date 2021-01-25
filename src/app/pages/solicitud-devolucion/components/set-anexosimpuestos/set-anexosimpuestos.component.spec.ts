import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetAnexosimpuestosComponent } from './set-anexosimpuestos.component';

describe('SetAnexosimpuestosComponent', () => {
  let component: SetAnexosimpuestosComponent;
  let fixture: ComponentFixture<SetAnexosimpuestosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetAnexosimpuestosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetAnexosimpuestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
