import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCreditoComponent } from './add-credito.component';

describe('AddCreditoComponent', () => {
  let component: AddCreditoComponent;
  let fixture: ComponentFixture<AddCreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCreditoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
