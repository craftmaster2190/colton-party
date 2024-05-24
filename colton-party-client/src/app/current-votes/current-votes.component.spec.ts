import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentVotesComponent } from './current-votes.component';

describe('CurrentVotesComponent', () => {
  let component: CurrentVotesComponent;
  let fixture: ComponentFixture<CurrentVotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentVotesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrentVotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
