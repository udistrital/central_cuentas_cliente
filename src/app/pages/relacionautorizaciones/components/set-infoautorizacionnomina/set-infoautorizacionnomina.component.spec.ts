import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetInfoAutorizacionnominaComponent } from './set-infoautorizacionnomina.component';

describe('SetInfoAutorizacionnominaComponent', () => {
  let component: SetInfoAutorizacionnominaComponent;
  let fixture: ComponentFixture<SetInfoAutorizacionnominaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetInfoAutorizacionnominaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetInfoAutorizacionnominaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
