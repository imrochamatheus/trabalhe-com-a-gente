import { HttpService } from "@nestjs/axios";
import { SearchIssuesResponseDto } from "../dtos/issues/search-issues-response.dto";
import { SearchRepositoriesResponseDto } from "../dtos/repositories/search-repositories-response.dto";
export declare class GithubService {
    private readonly httpService;
    constructor(httpService: HttpService);
    searchRepositories(query: string, page?: number, perPage?: number): Promise<SearchRepositoriesResponseDto>;
    getRepositoryIssues(owner: string, repo: string): Promise<SearchIssuesResponseDto>;
}
