import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutBorradoComponent } from './layout-borrado.component';

describe('LayoutBorradoComponent', () => {
  let component: LayoutBorradoComponent;
  let fixture: ComponentFixture<LayoutBorradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutBorradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutBorradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
