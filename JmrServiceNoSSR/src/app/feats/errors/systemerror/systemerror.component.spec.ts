import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemerrorComponent } from './systemerror.component';

describe('SystemerrorComponent', () => {
  let component: SystemerrorComponent;
  let fixture: ComponentFixture<SystemerrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemerrorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SystemerrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
