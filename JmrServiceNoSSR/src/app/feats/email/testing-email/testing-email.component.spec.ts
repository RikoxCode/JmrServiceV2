import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingEmailComponent } from './testing-email.component';

describe('TestingEmailComponent', () => {
  let component: TestingEmailComponent;
  let fixture: ComponentFixture<TestingEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingEmailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestingEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
