export interface GithubResponse<T> {
  total_count: number;
  items: T[];
}
