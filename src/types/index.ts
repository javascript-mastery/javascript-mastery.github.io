export type Theme = 'light' | 'dark';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type PathLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface RoadmapModule {
  id: string;
  title: string;
  description: string;
  level: PathLevel;
  topics: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  repoUrl: string;
  tags: string[];
}

export interface GitHubStats {
  stars: number;
  contributors: number;
  forks: number;
}

export interface ProgressState {
  completedModules: string[];
  completedProjects: string[];
}
