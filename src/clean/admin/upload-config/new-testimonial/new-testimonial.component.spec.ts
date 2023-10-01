import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTestimonialComponent } from './new-testimonial.component';

describe('NewTestimonialComponent', () => {
  let component: NewTestimonialComponent;
  let fixture: ComponentFixture<NewTestimonialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewTestimonialComponent]
    });
    fixture = TestBed.createComponent(NewTestimonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
