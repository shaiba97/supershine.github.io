import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPasswordComponent } from './admin-password.component';

describe('AdminPasswordComponent', () => {
  let component: AdminPasswordComponent;
  let fixture: ComponentFixture<AdminPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPasswordComponent]
    });
    fixture = TestBed.createComponent(AdminPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
