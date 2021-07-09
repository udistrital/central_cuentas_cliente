import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbolRubroComponent } from './arbol-rubro.component';

describe('ArbolRubroComponent', () => {
  let component: ArbolRubroComponent;
  let fixture: ComponentFixture<ArbolRubroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArbolRubroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbolRubroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
