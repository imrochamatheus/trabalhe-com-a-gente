export class RepositoryOwnerDto {
  login: string;
  avatar_url: string;
  html_url: string;
}

export class RepositoryItemDto {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: RepositoryOwnerDto;
}

export class SearchRepositoriesResponseDto {
  total_count: number;
  incomplete_results: boolean;
  items: RepositoryItemDto[];
}
