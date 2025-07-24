import { Component } from "@angular/core";
import { GithubService } from "../../core/services/github.service";
import { Repository } from "../../shared/models/repository.model";

import { TableLazyLoadEvent, TableModule } from "primeng/table";
import { catchError, of, take } from "rxjs";
import { FormsModule } from "@angular/forms";
import { LazyLoadEvent } from "primeng/api";

@Component({
  selector: "app-repositories",
  imports: [TableModule, FormsModule],
  templateUrl: "./repositories.component.html",
})
export class RepositoriesComponent {
  public repositories: Repository[] = [];
  public total = 0;
  public rows = 10;
  public error = false;
  public loading = true;
  public query = "nestjs";

  constructor(private github: GithubService) {}

  public loadRepos(page: number = 1): void {
    this.loading = true;
    this.error = false;

    this.github
      .getRepositories(this.query, page, this.rows)
      .pipe(
        take(1),
        catchError((err) => {
          this.total = 0;
          this.error = true;
          this.loading = false;
          this.repositories = [];

          return of({ items: [], total_count: 0 });
        })
      )
      .subscribe((res) => {
        this.repositories = res.items;
        this.total = res.total_count;
        this.loading = false;
      });
  }

  public onSearch(): void {
    if (!this.query?.trim()) {
      return;
    }

    this.loadRepos(1);
  }

  public onPage(event: TableLazyLoadEvent): void {
    const first = event.first ?? 0;
    const rows = event.rows ?? this.rows;

    const page = first / rows + 1;
    this.loadRepos(page);
  }
}
