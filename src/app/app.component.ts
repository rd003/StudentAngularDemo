import { Component, inject } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";
import { ToolbarModule } from "primeng/toolbar";
import { ButtonModule } from "primeng/button";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, RouterModule, ToolbarModule, ButtonModule],
  template: `
    <p-toolbar>
      <div class="p-toolbar-group-left" style="display: flex;gap:10px">
        <button
          pButton
          type="button"
          icon="pi pi-home"
          label="Home"
          routerLink="/home"
          routerLinkActive="active"
        ></button>
        <button
          pButton
          type="button"
          icon="pi pi-users"
          label="Students"
          routerLink="/students"
          routerLinkActive="active"
        ></button>
      </div>
      <div class="p-toolbar-group-right">
        <button pButton type="button" label="Login"></button>
      </div>
    </p-toolbar>

    <div style="padding: 0px 20px;">
      <router-outlet />
    </div>
  `,
  styles: [
    `
      .active {
        background-color: rgb(255 0 0);

        color: #fff;
      }
      .active:hover {
        background-color: rgb(230 22 22);
        color: #fff;
      }
    `,
  ],
})
export class AppComponent {}
