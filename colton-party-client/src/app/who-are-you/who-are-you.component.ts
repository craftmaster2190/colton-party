import {Component} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {CurrentStateService} from "../state/current-state.service";
import {HttpClient} from "@angular/common/http";
import {debounceTime, EMPTY, empty, Observable, Subject, switchMap, tap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-who-are-you',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './who-are-you.component.html',
  styleUrl: './who-are-you.component.scss'
})
export class WhoAreYouComponent {
  name: string = '';

  changeNameInputSubject = new Subject()
  isLoading: boolean = false;

  constructor(public readonly activeModal: NgbActiveModal,
              private readonly stateService: CurrentStateService,
              private readonly httpClient: HttpClient) {
    this.stateService.myUserState.subscribe(userState => {
      this.name = userState.myName;
    });

    this.changeNameInputSubject.pipe(
      takeUntilDestroyed(),
      debounceTime(500),
      switchMap(() => this.updateNameObservable())
    ).subscribe()
  }

  changeName() {
    if (this.name) {
      this.isLoading = true;
      this.updateNameObservable()
        .pipe(
          switchMap(() => this.stateService.updateMyUserState()),
          tap(() => this.activeModal.close(), () => this.isLoading = false)
        ).subscribe(() => {
      });
    } else {
      console.log("Name is empty")
    }
  }

  updateNameObservable() {
    if (this.name) {
      return this.httpClient.put(`/api/me/name/${this.name}`, null);
    }
    return EMPTY;
  }

  onChangeName() {
    this.changeNameInputSubject.next(this.name);
  }
}
