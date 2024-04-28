export type TCreateProject = {
  name: string;
  description?: string;
  website_url?: string;
  image_url?: string;
  github_url?: string;
};

export type TProject = {
  id: string;
  name: string;
  description: string | null;
  website_url: string | null;
  image_url: string | null;
  github_url: string | null;
  created_at: Date;
  updated_at: Date;
};
