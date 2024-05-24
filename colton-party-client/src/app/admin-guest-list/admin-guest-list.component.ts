import { Component } from '@angular/core';
import {interval, switchMap} from "rxjs";
import {NgForOf} from "@angular/common";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-admin-guest-list',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './admin-guest-list.component.html',
  styleUrl: './admin-guest-list.component.scss'
})
export class AdminGuestListComponent {
  attendees: string[] = [];
  constructor(private readonly httpClient: HttpClient) {
    interval(Math.random() * 2000 + 10_000).pipe(
      switchMap(() => this.httpClient.get<string[]>('/api/attendees'))
    ).subscribe((attendees) => this.attendees = attendees.sort());
  }

}
