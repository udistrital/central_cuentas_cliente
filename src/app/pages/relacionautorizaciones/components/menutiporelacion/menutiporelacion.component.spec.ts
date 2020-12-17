import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenutiporelacionComponent } from './menutiporelacion.component';

describe('MenutiporelacionComponent', () => {
  let component: MenutiporelacionComponent;
  let fixture: ComponentFixture<MenutiporelacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenutiporelacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenutiporelacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
