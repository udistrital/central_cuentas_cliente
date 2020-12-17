import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutAprobacionordenComponent } from './layout-aprobacionorden.component';

describe('LayoutAprobacionordenComponent', () => {
  let component: LayoutAprobacionordenComponent;
  let fixture: ComponentFixture<LayoutAprobacionordenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutAprobacionordenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutAprobacionordenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
