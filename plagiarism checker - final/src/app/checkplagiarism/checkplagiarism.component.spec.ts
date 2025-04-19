import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckplagiarismComponent } from './checkplagiarism.component';

describe('CheckplagiarismComponent', () => {
  let component: CheckplagiarismComponent;
  let fixture: ComponentFixture<CheckplagiarismComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckplagiarismComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckplagiarismComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
