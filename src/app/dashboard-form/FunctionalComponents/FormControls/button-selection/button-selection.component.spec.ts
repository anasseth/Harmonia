import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSelectionComponent } from './button-selection.component';

describe('ButtonSelectionComponent', () => {
  let component: ButtonSelectionComponent;
  let fixture: ComponentFixture<ButtonSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
