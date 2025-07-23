export interface Issue {
  id: number;
  title: string;
  html_url: string;
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  user: {
    login: string;
    html_url: string;
    avatar_url: string;
  };
}
