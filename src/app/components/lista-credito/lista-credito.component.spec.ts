import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCreditoComponent } from './lista-credito.component';

describe('ListaCreditoComponent', () => {
  let component: ListaCreditoComponent;
  let fixture: ComponentFixture<ListaCreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaCreditoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
