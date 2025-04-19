import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaydocumentComponent } from './displaydocument.component';

describe('DisplaydocumentComponent', () => {
  let component: DisplaydocumentComponent;
  let fixture: ComponentFixture<DisplaydocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplaydocumentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplaydocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
