import { HttpModule, HttpService } from "@nestjs/axios";
import { Test, TestingModule } from "@nestjs/testing";
import AxiosMockAdapter from "axios-mock-adapter";
import { setupAxiosMock } from "../helpers/axios-mock-helper";
import { GithubService } from "../../src/github/services/github.service";
import { SearchIssuesResponseDto } from "src/github/dtos/issues/search-issues-response.dto";
import { SearchRepositoriesResponseDto } from "src/github/dtos/repositories/search-repositories-response.dto";

describe("GithubService", () => {
  let service: GithubService;
  let httpService: HttpService;
  let axiosMock: AxiosMockAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [GithubService],
    }).compile();

    service = module.get<GithubService>(GithubService);
    httpService = module.get<HttpService>(HttpService);

    axiosMock = setupAxiosMock(httpService);
  });

  afterEach(() => {
    axiosMock.reset();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return mocked repository search results", async () => {
    const repositoryMockData: SearchRepositoriesResponseDto = {
      total_count: 1,
      incomplete_results: false,
      items: [
        {
          id: 1,
          name: "nestjs",
          full_name: "nestjs/nest",
          html_url: "https://github.com/nestjs/nest",
          description: "A progressive Node.js framework",
          stargazers_count: 50000,
          watchers_count: 50000,
          forks_count: 8000,
          open_issues_count: 100,
          owner: {
            login: "nestjs",
            avatar_url: "https://avatars.githubusercontent.com/u/28507035",
            html_url: "https://github.com/nestjs",
          },
        },
      ],
    };

    axiosMock
      .onGet(
        "https://api.github.com/search/repositories?q=nestjs&page=1&per_page=10",
      )
      .reply(200, repositoryMockData);

    const result = await service.searchRepositories("nestjs", 1, 10);
    expect(result).toEqual(repositoryMockData);
  });

  it("should return mocked issues", async () => {
    const issuesMockData: SearchIssuesResponseDto = {
      total_count: 1,
      incomplete_results: false,
      items: [
        {
          id: 101,
          title: "Bug report",
          html_url: "https://github.com/nestjs/nest/issues/101",
          state: "open",
          user: {
            login: "contributor",
            avatar_url: "https://avatars.githubusercontent.com/u/123456",
            html_url: "https://github.com/contributor",
          },
          comments: 2,
          created_at: "2023-01-01T00:00:00Z",
          updated_at: "2023-01-02T00:00:00Z",
        },
      ],
    };

    axiosMock
      .onGet("https://api.github.com/search/issues?q=repo:nestjs/nest")
      .reply(200, issuesMockData);

    const result = await service.getRepositoryIssues("nestjs", "nest");
    expect(result).toEqual(issuesMockData);
  });
});
