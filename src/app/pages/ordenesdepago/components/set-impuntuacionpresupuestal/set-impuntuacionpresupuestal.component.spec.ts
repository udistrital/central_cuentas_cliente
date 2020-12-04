import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetImpuntuacionpresupuestalComponent } from './set-impuntuacionpresupuestal.component';

describe('SetImpuntuacionpresupuestalComponent', () => {
  let component: SetImpuntuacionpresupuestalComponent;
  let fixture: ComponentFixture<SetImpuntuacionpresupuestalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetImpuntuacionpresupuestalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetImpuntuacionpresupuestalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
