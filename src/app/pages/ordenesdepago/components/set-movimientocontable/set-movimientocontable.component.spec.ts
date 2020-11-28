import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetMovimientocontableComponent } from './set-movimientocontable.component';

describe('SetMovimientocontableComponent', () => {
  let component: SetMovimientocontableComponent;
  let fixture: ComponentFixture<SetMovimientocontableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetMovimientocontableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetMovimientocontableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
