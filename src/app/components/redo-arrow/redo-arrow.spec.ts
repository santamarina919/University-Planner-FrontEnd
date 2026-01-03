import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedoArrow } from './redo-arrow';

describe('RedoArrow', () => {
  let component: RedoArrow;
  let fixture: ComponentFixture<RedoArrow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedoArrow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedoArrow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
