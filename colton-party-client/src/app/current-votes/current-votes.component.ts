import {Component, Input, OnInit} from '@angular/core';
import {IsAdminComponent} from "../is-admin/is-admin.component";
import {HttpClient} from "@angular/common/http";
import {CurrentStateService} from "../state/current-state.service";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {RatingInputComponent} from "../rating-input/rating-input.component";
import {map, take} from "rxjs";

@Component({
  selector: 'app-current-votes',
  standalone: true,
  imports: [
    IsAdminComponent,
    NgForOf,
    RatingInputComponent,
    NgIf,
    JsonPipe
  ],
  templateUrl: './current-votes.component.html',
  styleUrl: './current-votes.component.scss'
})
export class CurrentVotesComponent implements OnInit {
  @Input() votes: string[] = [];
  myVotes?: Record<string, number> = {"loading": 1};

  constructor(private readonly httpClient: HttpClient,
              private readonly stateService: CurrentStateService) {
  }

  ngOnInit(): void {
    this.stateService.myUserState.pipe(take(1)).subscribe(initialUserState => {
      console.log("myVotes", initialUserState.myVotes);
      this.myVotes = initialUserState.myVotes;
    });
  }

  addVote(voteName: string) {
    this.httpClient.put(`/api/vote/${voteName}`, null)
      .subscribe(() => this.stateService.updateCurrentGameState());
  }

  removeVote(voteName: string) {
    this.httpClient.delete(`/api/vote/${voteName}`)
      .subscribe(() => this.stateService.updateCurrentGameState());
  }

  setMyVote(voteName: string, voteValue: number) {
    this.httpClient.put(`/api/me/vote/${voteName}/${voteValue}`, null)
      .subscribe();
      // .subscribe(() => this.stateService.updateMyUserState());
  }
}
