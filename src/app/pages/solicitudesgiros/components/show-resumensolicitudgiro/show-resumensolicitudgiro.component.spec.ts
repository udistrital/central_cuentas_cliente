import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowResumensolicitudgiroComponent } from './show-resumensolicitudgiro.component';

describe('ShowResumensolicitudgiroComponent', () => {
  let component: ShowResumensolicitudgiroComponent;
  let fixture: ComponentFixture<ShowResumensolicitudgiroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowResumensolicitudgiroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowResumensolicitudgiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
