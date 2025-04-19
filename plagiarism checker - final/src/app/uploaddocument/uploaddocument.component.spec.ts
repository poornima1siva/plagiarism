import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploaddocumentComponent } from './uploaddocument.component';

describe('UploaddocumentComponent', () => {
  let component: UploaddocumentComponent;
  let fixture: ComponentFixture<UploaddocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploaddocumentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploaddocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
