import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrerequisiteComp } from './prerequisite-comp';

describe('PrerequisiteComp', () => {
  let component: PrerequisiteComp;
  let fixture: ComponentFixture<PrerequisiteComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrerequisiteComp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrerequisiteComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
