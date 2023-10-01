import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetConfigComponent } from './get-config.component';

describe('GetConfigComponent', () => {
  let component: GetConfigComponent;
  let fixture: ComponentFixture<GetConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetConfigComponent]
    });
    fixture = TestBed.createComponent(GetConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
