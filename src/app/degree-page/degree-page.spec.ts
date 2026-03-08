import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DegreePage } from './degree-page';

describe('DegreePage', () => {
  let component: DegreePage;
  let fixture: ComponentFixture<DegreePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DegreePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DegreePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
