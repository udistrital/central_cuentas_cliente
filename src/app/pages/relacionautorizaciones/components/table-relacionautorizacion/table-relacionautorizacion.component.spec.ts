import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRelacionautorizacionComponent } from './table-relacionautorizacion.component';

describe('TableRelacionautorizacionComponent', () => {
  let component: TableRelacionautorizacionComponent;
  let fixture: ComponentFixture<TableRelacionautorizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableRelacionautorizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableRelacionautorizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
