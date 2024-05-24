import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-rating-input',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './rating-input.component.html',
  styleUrl: './rating-input.component.scss'
})
export class RatingInputComponent {
  @Input()
  value = 0;

  @Output()
  ratingChange = new EventEmitter<number>();

  setValue(number: number) {
    this.value = number;
    this.ratingChange.emit(number);
  }
}
