export class IssueItemDto {
  id: number;
  title: string;
  html_url: string;
  state: string;
  user: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  comments: number;
  created_at: string;
  updated_at: string;
}

export class SearchIssuesResponseDto {
  total_count: number;
  incomplete_results: boolean;
  items: IssueItemDto[];
}
