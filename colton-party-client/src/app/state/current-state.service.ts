import {Injectable} from '@angular/core';
import {BehaviorSubject, ReplaySubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

export interface UserState {
  myName: string;
  myVotes: Record<string, number>;
}

export interface GameState {
  mostRecentBingoNumber: number;
  currentVotes: string[];
  currentActivities: string[];
  bingoEnabled: boolean;
  drawnBingoNumbers: number[];
}

@Injectable({
  providedIn: 'root'
})
export class CurrentStateService {

  readonly myUserState = new ReplaySubject<UserState>(1);
  readonly gameState = new ReplaySubject<GameState>(1);


  constructor(private readonly httpClient: HttpClient) {
    setInterval(() => {
      this.updateCurrentGameState();
    }, Math.ceil(Math.random() * 6000) + 3000); // every 3-9 seconds
    this.updateMyUserState();
    this.updateCurrentGameState();
  }

  updateCurrentGameState() {
    const gameStateObservable = this.httpClient.get<GameState>(`/api/state`);
    gameStateObservable.subscribe(gameState => this.gameState.next(gameState));
    return gameStateObservable;
  }

  updateMyUserState() {
    const userStateObservable = this.httpClient.get<UserState>(`/api/me`);
    userStateObservable.subscribe(userState => this.myUserState.next(userState));
    return userStateObservable;
  }
}
