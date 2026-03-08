import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownDown } from './dropdown-down';

describe('DropdownDown', () => {
  let component: DropdownDown;
  let fixture: ComponentFixture<DropdownDown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownDown]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownDown);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
