import { Controller, Get, Query } from "@nestjs/common";
import { GithubService } from "../services/github.service";
import { SearchRepositoriesResponseDto } from "../dtos/repositories/search-repositories-response.dto";
import { SearchIssuesResponseDto } from "../dtos/issues/search-issues-response.dto";

@Controller("github")
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get("repositories")
  async searchRepositories(
    @Query("q") query: string,
    @Query("page") page: number,
    @Query("per_page") perPage: number = 10,
  ): Promise<SearchRepositoriesResponseDto> {
    return this.githubService.searchRepositories(query, page, perPage);
  }

  @Get("issues")
  async getIssues(
    @Query("owner") owner: string,
    @Query("repo") repo: string,
  ): Promise<SearchIssuesResponseDto> {
    return this.githubService.getRepositoryIssues(owner, repo);
  }
}
