import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationApprobationComponent } from './relation-approbation.component';

describe('RelationApprobationComponent', () => {
  let component: RelationApprobationComponent;
  let fixture: ComponentFixture<RelationApprobationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationApprobationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationApprobationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
