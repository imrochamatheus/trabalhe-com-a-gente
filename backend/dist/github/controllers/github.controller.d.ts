import { GithubService } from "../services/github.service";
import { SearchRepositoriesResponseDto } from "../dtos/repositories/search-repositories-response.dto";
import { SearchIssuesResponseDto } from "../dtos/issues/search-issues-response.dto";
export declare class GithubController {
    private readonly githubService;
    constructor(githubService: GithubService);
    searchRepositories(query: string, page: number, perPage?: number): Promise<SearchRepositoriesResponseDto>;
    getIssues(owner: string, repo: string): Promise<SearchIssuesResponseDto>;
}
