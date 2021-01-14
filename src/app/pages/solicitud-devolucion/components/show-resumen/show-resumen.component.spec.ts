import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowResumenComponent } from './show-resumen.component';

describe('ShowResumenComponent', () => {
  let component: ShowResumenComponent;
  let fixture: ComponentFixture<ShowResumenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowResumenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowResumenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
