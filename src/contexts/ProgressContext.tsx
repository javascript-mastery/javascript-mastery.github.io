import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ProgressState } from '../types';

interface ProgressContextType {
  progress: ProgressState;
  toggleModule: (moduleId: string) => void;
  toggleProject: (projectId: string) => void;
  getProgressPercentage: () => number;
  totalModules: number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const STORAGE_KEY = 'js-mastery-progress';

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressState>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored
      ? JSON.parse(stored)
      : { completedModules: [], completedProjects: [] };
  });

  const [totalModules] = useState(18);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const toggleModule = (moduleId: string) => {
    setProgress((prev) => {
      const isCompleted = prev.completedModules.includes(moduleId);
      return {
        ...prev,
        completedModules: isCompleted
          ? prev.completedModules.filter((id) => id !== moduleId)
          : [...prev.completedModules, moduleId],
      };
    });
  };

  const toggleProject = (projectId: string) => {
    setProgress((prev) => {
      const isCompleted = prev.completedProjects.includes(projectId);
      return {
        ...prev,
        completedProjects: isCompleted
          ? prev.completedProjects.filter((id) => id !== projectId)
          : [...prev.completedProjects, projectId],
      };
    });
  };

  const getProgressPercentage = () => {
    return Math.round((progress.completedModules.length / totalModules) * 100);
  };

  return (
    <ProgressContext.Provider
      value={{ progress, toggleModule, toggleProject, getProgressPercentage, totalModules }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
}
