import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDto } from './course-dto';

describe('CourseDto', () => {
  let component: CourseDto;
  let fixture: ComponentFixture<CourseDto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseDto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseDto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
