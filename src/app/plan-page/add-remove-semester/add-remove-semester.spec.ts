import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRemoveSemester } from './add-remove-semester';

describe('AddRemoveSemester', () => {
  let component: AddRemoveSemester;
  let fixture: ComponentFixture<AddRemoveSemester>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRemoveSemester]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRemoveSemester);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
