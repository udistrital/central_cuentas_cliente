import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetInfodevoluciontributariaComponent } from './set-infodevoluciontributaria.component';

describe('SetInfodevoluciontributariaComponent', () => {
  let component: SetInfodevoluciontributariaComponent;
  let fixture: ComponentFixture<SetInfodevoluciontributariaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetInfodevoluciontributariaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetInfodevoluciontributariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
