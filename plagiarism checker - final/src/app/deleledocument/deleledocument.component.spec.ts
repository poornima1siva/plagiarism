import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleledocumentComponent } from './deleledocument.component';

describe('DeleledocumentComponent', () => {
  let component: DeleledocumentComponent;
  let fixture: ComponentFixture<DeleledocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleledocumentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleledocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
