import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BingoSpinnerComponent } from './bingo-spinner.component';

describe('BingoSpinnerComponent', () => {
  let component: BingoSpinnerComponent;
  let fixture: ComponentFixture<BingoSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BingoSpinnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BingoSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
