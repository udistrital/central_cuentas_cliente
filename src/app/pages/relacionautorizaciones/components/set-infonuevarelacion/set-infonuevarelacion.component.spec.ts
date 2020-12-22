import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetInfonuevarelacionComponent } from './set-infonuevarelacion.component';

describe('SetInfoNuevarelacionComponent', () => {
  let component: SetInfonuevarelacionComponent;
  let fixture: ComponentFixture<SetInfonuevarelacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetInfonuevarelacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetInfonuevarelacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
