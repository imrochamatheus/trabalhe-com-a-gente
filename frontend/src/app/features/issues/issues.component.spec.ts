import { provideHttpClient } from "@angular/common/http";
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from "primeng/table";
import { of, throwError } from "rxjs";
import { GithubService } from "../../core/services/github.service";
import { GithubResponse } from "../../shared/models/github.model";
import { Issue } from "../../shared/models/issue.model";
import { IssuesComponent } from "./issues.component";

jest.mock("../../core/services/github.service.ts");

describe("IssuesComponent", () => {
  let component: IssuesComponent;
  let fixture: ComponentFixture<IssuesComponent>;
  let githubService: jest.Mocked<GithubService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        TableModule,
        InputTextModule,
        ButtonModule,
        IssuesComponent,
      ],
      providers: [GithubService, provideAnimationsAsync(), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(IssuesComponent);
    component = fixture.componentInstance;
    githubService = TestBed.inject(GithubService) as jest.Mocked<GithubService>;
    githubService.getIssues.mockReturnValue(of({ total_count: 0, items: [] }));
  });

  it("deve criar o componente", () => {
    expect(component).toBeTruthy();
  });

  it("deve buscar issues ao chamar searchIssues", fakeAsync(() => {
    const mockIssues: GithubResponse<Issue> = {
      total_count: 1,
      items: [
        {
          id: 123456,
          title: "Erro ao carregar componente em produção",
          html_url: "https://github.com/nestjs/nest/issues/123456",
          state: "open",
          comments: 7,
          created_at: "2024-06-01T10:23:00Z",
          updated_at: "2024-06-02T15:42:00Z",
          user: {
            login: "devexample",
            html_url: "https://github.com/devexample",
            avatar_url: "https://avatars.githubusercontent.com/u/123456?v=4",
          },
        },
      ],
    };

    component.owner = "angular";
    component.repo = "angular";
    githubService.getIssues.mockReturnValue(of(mockIssues));

    component.searchIssues();
    tick();

    expect(component.issues.length).toBe(1);
    expect(component.error).toBe(false);
    expect(component.loading).toBe(false);
  }));

  it("deve tratar erro ao buscar issues", fakeAsync(() => {
    component.owner = "angular";
    component.repo = "angular";
    githubService.getIssues.mockReturnValue(
      throwError(() => new Error("Erro"))
    );

    component.searchIssues();
    tick();

    expect(component.issues).toEqual([]);
    expect(component.error).toBe(true);
    expect(component.loading).toBe(false);
  }));

  it("não deve buscar se owner ou repo estiverem vazios", () => {
    component.owner = "";
    component.repo = "";
    component.searchIssues();
    expect(githubService.getIssues).not.toHaveBeenCalled();
  });
});
