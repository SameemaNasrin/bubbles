import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnapSectionComponent } from './snap-section.component';

describe('SnapSectionComponent', () => {
  let component: SnapSectionComponent;
  let fixture: ComponentFixture<SnapSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnapSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SnapSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
