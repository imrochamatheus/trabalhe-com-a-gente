import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { of, throwError } from "rxjs";
import { LazyLoadEvent } from "primeng/api";
import { RepositoriesComponent } from "./repositories.component";
import { GithubService } from "../../core/services/github.service";
import { HttpClient, provideHttpClient } from "@angular/common/http";
import {
  Repository,
  RepositoryOwner,
} from "../../shared/models/repository.model";
import { GithubResponse } from "../../shared/models/github.model";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";

jest.mock("../../core/services/github.service.ts");

describe("GithubRepoComponent (Jest)", () => {
  let component: RepositoriesComponent;
  let fixture: ComponentFixture<RepositoriesComponent>;
  let githubRepoService: jest.Mocked<GithubService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        RepositoriesComponent,
      ],
      providers: [GithubService, provideAnimationsAsync(), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(RepositoriesComponent);
    component = fixture.componentInstance;
    githubRepoService = TestBed.inject(
      GithubService
    ) as jest.Mocked<GithubService>;
  });

  it("deve criar o componente", () => {
    expect(component).toBeTruthy();
  });

  it("deve buscar repositórios ao chamar onSearch", fakeAsync(() => {
    const mockResponse: GithubResponse<Repository> = {
      total_count: 2,
      items: [
        {
          id: 1,
          name: "angular",
          full_name: "angular/angular",
          html_url: "https://github.com/angular/angular",
          description: "",
          stargazers_count: 0,
          watchers_count: 0,
          forks_count: 0,
          open_issues_count: 0,
          owner: {} as RepositoryOwner,
        },
        {
          id: 2,
          name: "react",
          full_name: "facebook/react",
          html_url: "https://github.com/facebook/react",
          description: "",
          stargazers_count: 0,
          watchers_count: 0,
          forks_count: 0,
          open_issues_count: 0,
          owner: {} as RepositoryOwner,
        },
      ],
    };

    component.query = "angular";
    githubRepoService.getRepositories.mockReturnValue(of(mockResponse));

    component.onSearch();
    tick();

    expect(component.repositories.length).toBe(2);
    expect(component.total).toBe(2);
    expect(component.loading).toBe(false);
    expect(component.error).toBe(false);
  }));

  it("deve definir error como true em caso de falha no onSearch", fakeAsync(() => {
    component.query = "angular";
    githubRepoService.getRepositories.mockReturnValue(
      throwError(() => new Error("Erro"))
    );

    component.onSearch();
    tick();

    expect(component.repositories.length).toBe(0);
    expect(component.total).toBe(0);
    expect(component.loading).toBe(false);
    expect(component.error).toBe(true);
  }));

  it("deve atualizar a página ao chamar onPage", fakeAsync(() => {
    const mockResponse: GithubResponse<Repository> = {
      total_count: 1,
      items: [
        {
          id: 1,
          name: "nestjs",
          full_name: "nestjs/nest",
          html_url: "https://github.com/nestjs/nest",
          description:
            "A progressive Node.js framework for building efficient, reliable and scalable server-side applications.",
          stargazers_count: 100000,
          watchers_count: 100000,
          forks_count: 10000,
          open_issues_count: 500,
          owner: {} as RepositoryOwner,
        },
      ],
    };

    githubRepoService.getRepositories.mockReturnValue(of(mockResponse));

    const event: LazyLoadEvent = {
      first: 10,
      rows: 10,
    };

    component.query = "nestjs";
    component.onPage(event);
    tick();

    expect(component.repositories.length).toBe(1);
    expect(component.total).toBe(1);
    expect(component.loading).toBe(false);
  }));

  it("não deve buscar repositórios se query estiver vazia", () => {
    component.query = "";
    component.onSearch();
    expect(githubRepoService.getRepositories).not.toHaveBeenCalled();
  });
});
