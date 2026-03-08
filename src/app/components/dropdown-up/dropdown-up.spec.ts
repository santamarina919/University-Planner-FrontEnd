import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownUp } from './dropdown-up';

describe('DropdownUp', () => {
  let component: DropdownUp;
  let fixture: ComponentFixture<DropdownUp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownUp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownUp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
