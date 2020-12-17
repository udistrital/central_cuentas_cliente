import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDevoluciontributariaComponent } from './table-devoluciontributaria.component';

describe('TableDevoluciontributariaComponent', () => {
  let component: TableDevoluciontributariaComponent;
  let fixture: ComponentFixture<TableDevoluciontributariaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDevoluciontributariaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDevoluciontributariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
