import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPlanned } from './all-planned';

describe('AllPlanned', () => {
  let component: AllPlanned;
  let fixture: ComponentFixture<AllPlanned>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllPlanned]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPlanned);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
