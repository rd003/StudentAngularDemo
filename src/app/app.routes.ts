import { Routes } from "@angular/router";
import { HomeComponent } from "./home.component";

export const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "students",
    loadComponent() {
      return import("./student/student.component").then(
        (a) => a.StudentComponent
      );
    },
  },
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
  },
  {
    path: "**",
    loadComponent: () =>
      import("./not-found.component").then((a) => a.NotFoundComponent),
  },
];
