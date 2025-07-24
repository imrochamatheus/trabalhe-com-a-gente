import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";

import { TableModule } from "primeng/table";
import { catchError, of, take } from "rxjs";
import { Issue } from "../../shared/models/issue.model";
import { GithubService } from "../../core/services/github.service";

@Component({
  selector: "app-issues",
  imports: [CommonModule, TableModule, FormsModule],
  templateUrl: "./issues.component.html",
})
export class IssuesComponent implements OnInit {
  public issues: Issue[] = [];
  public loading = false;
  public error = false;

  public owner = "nestjs";
  public repo = "nest";

  constructor(private readonly github: GithubService) {}

  public ngOnInit(): void {
    this.searchIssues();
  }

  public searchIssues(): void {
    if (!this.owner.trim() || !this.repo.trim()) return;

    this.loading = true;
    this.error = false;

    this.github
      .getIssues(this.owner, this.repo)
      .pipe(
        take(1),
        catchError((err) => {
          this.issues = [];
          this.error = true;
          this.loading = false;

          return of({ items: [] });
        })
      )
      .subscribe((res) => {
        this.issues = res.items;
        this.loading = false;
      });
  }
}
