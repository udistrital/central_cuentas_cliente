import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetConsultanuevarelacionComponent } from './set-consultanuevarelacion.component';

describe('SetConsultanuevarelacionComponent', () => {
  let component: SetConsultanuevarelacionComponent;
  let fixture: ComponentFixture<SetConsultanuevarelacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetConsultanuevarelacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetConsultanuevarelacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
