import {Component, Input} from '@angular/core';
import {IsAdminComponent} from "../is-admin/is-admin.component";
import {NgForOf} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {CurrentStateService} from "../state/current-state.service";

@Component({
  selector: 'app-current-activities',
  standalone: true,
  imports: [
    IsAdminComponent,
    NgForOf
  ],
  templateUrl: './current-activities.component.html',
  styleUrl: './current-activities.component.scss'
})
export class CurrentActivitiesComponent {
  @Input() activities: string[] = [];

  constructor(private readonly httpClient: HttpClient, private readonly stateService: CurrentStateService) {
  }

  addActivity(activityName: string) {
    this.httpClient.put(`/api/activity/${activityName}`, null)
      .subscribe(() => this.stateService.updateCurrentGameState());
  }

  removeActivity(activityName: string) {
    this.httpClient.delete(`/api/activity/${activityName}`)
      .subscribe(() => this.stateService.updateCurrentGameState());
  }
}
