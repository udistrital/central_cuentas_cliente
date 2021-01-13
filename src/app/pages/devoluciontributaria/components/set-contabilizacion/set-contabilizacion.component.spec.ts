import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetContabilizacionComponent } from './set-contabilizacion.component';

describe('SetContabilizacionComponent', () => {
  let component: SetContabilizacionComponent;
  let fixture: ComponentFixture<SetContabilizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetContabilizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetContabilizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
