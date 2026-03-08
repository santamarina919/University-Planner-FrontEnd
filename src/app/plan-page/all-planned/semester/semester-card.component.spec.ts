import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterCard } from './semester-card.component';

describe('Semester', () => {
  let component: SemesterCard;
  let fixture: ComponentFixture<SemesterCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SemesterCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SemesterCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
