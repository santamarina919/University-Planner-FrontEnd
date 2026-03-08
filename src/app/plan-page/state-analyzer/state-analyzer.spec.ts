import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateAnalyzer } from './state-analyzer';

describe('StateAnalyzer', () => {
  let component: StateAnalyzer;
  let fixture: ComponentFixture<StateAnalyzer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateAnalyzer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateAnalyzer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
