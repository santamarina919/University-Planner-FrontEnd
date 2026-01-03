import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UndoArrow } from './undo-arrow';

describe('UndoArrow', () => {
  let component: UndoArrow;
  let fixture: ComponentFixture<UndoArrow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UndoArrow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UndoArrow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
