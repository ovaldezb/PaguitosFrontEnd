import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRefusedComponent } from './user-refused.component';

describe('UserRefusedComponent', () => {
  let component: UserRefusedComponent;
  let fixture: ComponentFixture<UserRefusedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserRefusedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRefusedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
