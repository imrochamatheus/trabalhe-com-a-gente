import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { firstValueFrom } from "rxjs";
import { SearchIssuesResponseDto } from "../dtos/issues/search-issues-response.dto";
import { SearchRepositoriesResponseDto } from "../dtos/repositories/search-repositories-response.dto";

@Injectable()
export class GithubService {
  constructor(private readonly httpService: HttpService) {}

  async searchRepositories(
    query: string,
    page = 1,
    perPage = 10,
  ): Promise<SearchRepositoriesResponseDto> {
    const url = `https://api.github.com/search/repositories?q=${query}&page=${page}&per_page=${perPage}`;
    const { data }: AxiosResponse<SearchRepositoriesResponseDto> =
      await firstValueFrom(this.httpService.get(url));

    return data;
  }

  async getRepositoryIssues(
    owner: string,
    repo: string,
  ): Promise<SearchIssuesResponseDto> {
    const url = `https://api.github.com/search/issues?q=repo:${owner}/${repo}`;
    const { data }: AxiosResponse<SearchIssuesResponseDto> =
      await firstValueFrom(this.httpService.get(url));

    return data;
  }
}
