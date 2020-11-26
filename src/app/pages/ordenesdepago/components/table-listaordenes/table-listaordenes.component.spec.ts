import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableListaordenesComponent } from './table-listaordenes.component';

describe('TableListaordenesComponent', () => {
  let component: TableListaordenesComponent;
  let fixture: ComponentFixture<TableListaordenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableListaordenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableListaordenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
