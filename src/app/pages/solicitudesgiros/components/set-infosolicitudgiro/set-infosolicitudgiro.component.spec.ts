import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetCrearsolicitudgiroComponent } from './set-crearsolicitudgiro.component';

describe('SetCrearsolicitudgiroComponent', () => {
  let component: SetCrearsolicitudgiroComponent;
  let fixture: ComponentFixture<SetCrearsolicitudgiroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetCrearsolicitudgiroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetCrearsolicitudgiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
