import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableListasolicitudesComponent } from './table-listasolicitudes.component';

describe('TableListasolicitudesComponent', () => {
  let component: TableListasolicitudesComponent;
  let fixture: ComponentFixture<TableListasolicitudesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableListasolicitudesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableListasolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
