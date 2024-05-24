import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVoteStatsComponent } from './admin-vote-stats.component';

describe('AdminVoteStatsComponent', () => {
  let component: AdminVoteStatsComponent;
  let fixture: ComponentFixture<AdminVoteStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminVoteStatsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminVoteStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
