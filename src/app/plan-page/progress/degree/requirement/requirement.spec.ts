import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Requirement } from './requirement';

describe('Requirement', () => {
  let component: Requirement;
  let fixture: ComponentFixture<Requirement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Requirement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Requirement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
