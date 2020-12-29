import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetExtractodesagregacionComponent } from './set-extractodesagregacion.component';

describe('SetExtractodesagregacionComponent', () => {
  let component: SetExtractodesagregacionComponent;
  let fixture: ComponentFixture<SetExtractodesagregacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetExtractodesagregacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetExtractodesagregacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
