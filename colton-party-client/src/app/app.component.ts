import {AfterViewInit, Component, inject, NgZone, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CurrentActivitiesComponent} from "./current-activities/current-activities.component";
import {CurrentVotesComponent} from "./current-votes/current-votes.component";
import {CurrentStateService} from "./state/current-state.service";
import {AsyncPipe, NgIf} from "@angular/common";
import {BingoSpinnerComponent} from "./bingo-spinner/bingo-spinner.component";
import {becomeAdmin, canBecomeAdmin, isAdmin, removeAdminFlag} from "./is-admin/isAdmin";
import {IsAdminComponent} from "./is-admin/is-admin.component";
import confetti from 'canvas-confetti';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {WhoAreYouComponent} from "./who-are-you/who-are-you.component";
import {AdminGuestListComponent} from "./admin-guest-list/admin-guest-list.component";
import {AdminVoteStatsComponent} from "./admin-vote-stats/admin-vote-stats.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CurrentActivitiesComponent, CurrentVotesComponent, AsyncPipe, NgIf, BingoSpinnerComponent, IsAdminComponent, AdminGuestListComponent, AdminVoteStatsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit {
  private readonly modalService = inject(NgbModal);

  constructor(readonly stateService: CurrentStateService, private readonly ngZone: NgZone) {
    if (!isAdmin() && location.search.includes('party-admin')) {
      becomeAdmin()
    }
  }

  ngOnInit(): void {
    this.stateService.myUserState.subscribe(userState => {
      if (!userState.myName) {
        this.modalService.open(WhoAreYouComponent, {
          centered: true,
          backdrop: 'static',
          keyboard: false
        });
      }
    });
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      for (let i = 0; i < Math.random() * 10 + 4; i++) {
        setTimeout(() => confetti({
            particleCount: Math.random() * 100 + 50,
            startVelocity: 30,
            spread: 360,
            origin: {
              x: Math.random(),
              // since they fall down, start a bit higher than random
              y: Math.random() - 0.2
            }
          }
        ), Math.random() * i * 600);
      }
    });
  }

  canBecomeAdmin = canBecomeAdmin();

  becomeAdmin() {
    becomeAdmin();
  }

  leaveAdmin() {
    removeAdminFlag();
  }

  changeName() {
    this.modalService.open(WhoAreYouComponent, {
      centered: true
    });
  }
}
