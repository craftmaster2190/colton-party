import { Component } from '@angular/core';
import {isAdmin} from "./isAdmin";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-is-admin',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './is-admin.component.html',
  styleUrl: './is-admin.component.scss'
})
export class IsAdminComponent {
  isAdmin = isAdmin();
}
