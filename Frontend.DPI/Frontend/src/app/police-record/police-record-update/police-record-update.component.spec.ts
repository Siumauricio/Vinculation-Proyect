import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliceRecordUpdateComponent } from './police-record-update.component';

describe('PoliceRecordUpdateComponent', () => {
  let component: PoliceRecordUpdateComponent;
  let fixture: ComponentFixture<PoliceRecordUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliceRecordUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliceRecordUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
