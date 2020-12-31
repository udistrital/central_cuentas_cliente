import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearBorradoComponent } from './crear-borrado.component';

describe('CrearBorradoComponent', () => {
  let component: CrearBorradoComponent;
  let fixture: ComponentFixture<CrearBorradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearBorradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearBorradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
