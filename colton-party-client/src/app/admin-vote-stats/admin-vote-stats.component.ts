import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {interval, switchMap} from "rxjs";
import {DecimalPipe, JsonPipe, NgForOf} from "@angular/common";

interface VoteResult {
  voteName: string; // Client only
  countOfVotes: number;
  averageVote: number;
}
type Votes = Record<string, VoteResult>

@Component({
  selector: 'app-admin-vote-stats',
  standalone: true,
  imports: [
    JsonPipe,
    NgForOf,
    DecimalPipe
  ],
  templateUrl: './admin-vote-stats.component.html',
  styleUrl: './admin-vote-stats.component.scss'
})
export class AdminVoteStatsComponent {

  voteResults: VoteResult[] = [];
  constructor(private readonly httpClient: HttpClient) {
    interval(Math.random() * 2000 + 10_000).pipe(
      switchMap(() => this.httpClient.get<Votes>('/api/votes'))
    ).subscribe((voteResults) => this.voteResults =
      Object.entries(voteResults).sort(([voteNameA, voteResultA], [voteNameB, voteResultB]) => {
        if  (voteResultB.countOfVotes === voteResultA.countOfVotes) {
          return voteResultB.averageVote - voteResultA.averageVote;
        }
        return voteResultB.countOfVotes - voteResultA.countOfVotes;
      })
        .map(([voteName, voteResult]) => ({
          ...voteResult,
          voteName
        }))
    );
  }
}
