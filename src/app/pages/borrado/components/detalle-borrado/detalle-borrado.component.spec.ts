import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleBorradoComponent } from './detalle-borrado.component';

describe('DetalleBorradoComponent', () => {
  let component: DetalleBorradoComponent;
  let fixture: ComponentFixture<DetalleBorradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleBorradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleBorradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
