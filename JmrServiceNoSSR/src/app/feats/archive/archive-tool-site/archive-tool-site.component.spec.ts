import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveToolSiteComponent } from './archive-tool-site.component';

describe('ArchiveToolSiteComponent', () => {
  let component: ArchiveToolSiteComponent;
  let fixture: ComponentFixture<ArchiveToolSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchiveToolSiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArchiveToolSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
