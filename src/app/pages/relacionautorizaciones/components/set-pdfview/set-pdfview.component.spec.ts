import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPdfviewComponent } from './set-pdfview.component';

describe('SetPdfviewComponent', () => {
  let component: SetPdfviewComponent;
  let fixture: ComponentFixture<SetPdfviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetPdfviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetPdfviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
