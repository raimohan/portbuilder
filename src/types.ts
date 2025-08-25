export interface Portfolio {
  id: string;
  title?: string;
  description?: string;
  slug?: string;
  isPublished?: boolean;
  templateId?: string;
}

export interface Project {
  id: string;
  portfolioId: string;
  title: string;
  description?: string;
  imageUrl?: string;
  projectUrl?: string;
  githubUrl?: string;
  technologies?: string[];
  featured?: boolean;
  order?: number;
  createdAt?: Date | string;
}

export interface Skill {
  id: string;
  portfolioId: string;
  name: string;
  category?: string;
  proficiency?: number;
  order?: number;
  createdAt?: Date | string;
}

export interface Template {
  id: string;
  name: string;
  description?: string;
  previewImage?: string;
  isPremium?: boolean;
}

export interface PublicPortfolioUser {
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
  bio?: string;
  email?: string;
}

export interface PublicPortfolio {
  id: string;
  description?: string;
  user?: PublicPortfolioUser;
  projects?: Array<{
    id: string;
    title: string;
    description?: string;
    imageUrl?: string;
    projectUrl?: string;
    githubUrl?: string;
    technologies?: string[];
  }>;
  skills?: Array<{ id: string; name: string; category?: string; proficiency?: number }>;
}

