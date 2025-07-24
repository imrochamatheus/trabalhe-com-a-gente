import { provideHttpClient } from "@angular/common/http";
import {
  HttpTestingController,
  provideHttpClientTesting,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { environment } from "../../../environments/environment";
import { GithubResponse } from "../../shared/models/github.model";
import { Issue } from "../../shared/models/issue.model";
import { Repository } from "../../shared/models/repository.model";
import { GithubService } from "./github.service";

describe("GithubService", () => {
  let service: GithubService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GithubService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(GithubService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("Deve criar o serviço GithubService", () => {
    expect(service).toBeTruthy();
  });

  it("Deve buscar repositórios com os parâmetros corretos", () => {
    const mockResponse: GithubResponse<Repository> = {
      total_count: 1,
      items: [{ id: 1, name: "repo1" } as Repository],
    };

    service.getRepositories("angular", 2, 5).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/repositories?q=angular&page=2&per_page=5`
    );

    expect(req.request.method).toBe("GET");
    req.flush(mockResponse);
  });

  it("Deve buscar issues com os parâmetros corretos", () => {
    const mockResponse: GithubResponse<Issue> = {
      total_count: 1,
      items: [{ id: 1, title: "Issue 1" } as Issue],
    };

    service.getIssues("angular", "core").subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/issues?owner=angular&repo=core`
    );

    expect(req.request.method).toBe("GET");
    req.flush(mockResponse);
  });
});
