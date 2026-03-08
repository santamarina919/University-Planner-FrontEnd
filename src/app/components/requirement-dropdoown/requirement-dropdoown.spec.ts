import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementDropdoown } from './requirement-dropdoown';

describe('RequirementDropdoown', () => {
  let component: RequirementDropdoown;
  let fixture: ComponentFixture<RequirementDropdoown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequirementDropdoown]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequirementDropdoown);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
