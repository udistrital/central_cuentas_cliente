import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetCargardocumentosComponent } from './set-cargardocumentos.component';

describe('SetCargardocumentosComponent', () => {
  let component: SetCargardocumentosComponent;
  let fixture: ComponentFixture<SetCargardocumentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetCargardocumentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetCargardocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
