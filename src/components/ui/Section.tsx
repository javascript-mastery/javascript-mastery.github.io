import React from 'react';
import { Container } from './Container';

export interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  background?: 'default' | 'gradient' | 'dots';
}

export const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  containerWidth = 'xl',
  background = 'default',
}) => {
  const backgrounds = {
    default: 'bg-white dark:bg-gray-900',
    gradient: 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800',
    dots: 'bg-white dark:bg-gray-900 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:16px_16px]',
  };

  return (
    <section className={`py-16 md:py-24 ${backgrounds[background]} ${className}`}>
      <Container maxWidth={containerWidth}>
        {children}
      </Container>
    </section>
  );
};
