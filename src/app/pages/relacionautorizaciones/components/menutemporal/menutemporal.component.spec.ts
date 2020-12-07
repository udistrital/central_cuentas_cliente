import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenutemporalComponent } from './menutemporal.component';

describe('MenutemporalComponent', () => {
  let component: MenutemporalComponent;
  let fixture: ComponentFixture<MenutemporalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenutemporalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenutemporalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
