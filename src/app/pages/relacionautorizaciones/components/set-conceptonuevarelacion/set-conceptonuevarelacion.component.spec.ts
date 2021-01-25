import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetConceptonuevarelacionComponent } from './set-conceptonuevarelacion.component';

describe('SetConceptonuevarelacionComponent', () => {
  let component: SetConceptonuevarelacionComponent;
  let fixture: ComponentFixture<SetConceptonuevarelacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetConceptonuevarelacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetConceptonuevarelacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
