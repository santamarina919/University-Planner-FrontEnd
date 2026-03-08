import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusPage } from './campus-page';

describe('CampusPage', () => {
  let component: CampusPage;
  let fixture: ComponentFixture<CampusPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampusPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampusPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
