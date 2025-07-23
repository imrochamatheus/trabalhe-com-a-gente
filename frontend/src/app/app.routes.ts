import { Routes } from "@angular/router";
import { IssuesComponent } from "./features/issues/issues.component";
import { RepositoriesComponent } from "./features/repositories/repositories.component";

export const routes: Routes = [
  { path: "", redirectTo: "repositories", pathMatch: "full" },
  { path: "repositories", component: RepositoriesComponent },
  { path: "issues", component: IssuesComponent },
  { path: "**", redirectTo: "repositories" },
];
