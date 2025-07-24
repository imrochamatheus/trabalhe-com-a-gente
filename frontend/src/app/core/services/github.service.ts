import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { GithubResponse } from "../../shared/models/github.model";
import { Issue } from "../../shared/models/issue.model";
import { Repository } from "../../shared/models/repository.model";

@Injectable({ providedIn: "root" })
export class GithubService {
  private baseUrl = environment.apiUrl;

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
