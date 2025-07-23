import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GithubResponse } from "../../shared/models/github.model";
import { Repository } from "../../shared/models/repository.model";
import { Issue } from "../../shared/models/issue.model";

@Injectable({ providedIn: "root" })
export class GithubService {
  private baseUrl = "http://localhost:8200/github";

  constructor(private readonly http: HttpClient) {}

  public getRepositories(
    query: string,
    page = 1,
    perPage = 10
  ): Observable<GithubResponse<Repository>> {
    const params = new HttpParams()
      .set("q", query)
      .set("page", page)
      .set("per_page", perPage);

    return this.http.get<GithubResponse<Repository>>(
      `${this.baseUrl}/repositories`,
      { params }
    );
  }

  public getIssues(
    owner: string,
    repo: string
  ): Observable<GithubResponse<Issue>> {
    const params = new HttpParams().set("owner", owner).set("repo", repo);
    return this.http.get<GithubResponse<Issue>>(`${this.baseUrl}/issues`, {
      params,
    });
  }
}
