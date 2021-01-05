import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowComprobantepagoComponent } from './show-comprobantepago.component';

describe('ShowComprobantepagoComponent', () => {
  let component: ShowComprobantepagoComponent;
  let fixture: ComponentFixture<ShowComprobantepagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowComprobantepagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowComprobantepagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
