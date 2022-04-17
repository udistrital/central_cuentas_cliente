import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizacionGiroComponent } from './autorizacion-giro.component';

describe('AutorizacionGiroComponent', () => {
  let component: AutorizacionGiroComponent;
  let fixture: ComponentFixture<AutorizacionGiroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutorizacionGiroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorizacionGiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
