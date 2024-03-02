import { Component, inject } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  template: `
    <ul>
      <li>
        <a routerLink="/home" routerLinkActive="active">Home</a>
      </li>
      <li>
        <a routerLink="/student" routerLinkActive="active">Student</a>
      </li>
    </ul>
    <div style="padding: 20px">
      <router-outlet />
    </div>
  `,
  styles: [
    `
      ul {
        display: flex;
        gap: 10px;
        padding: 10px 20px;
      }
      li {
        list-style: none;
      }
      a {
        text-decoration: none;
        color: black;
        font-size: 20px;
      }
      .active {
        color: green;
      }
    `,
  ],
})
export class AppComponent {}
