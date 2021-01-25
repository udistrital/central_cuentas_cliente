import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBorradoComponent } from './form-borrado.component';

describe('FormBorradoComponent', () => {
  let component: FormBorradoComponent;
  let fixture: ComponentFixture<FormBorradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBorradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBorradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
