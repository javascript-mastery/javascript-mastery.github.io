import React from "react";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hover = false,
  glass = false,
}) => {
  const baseStyles = "rounded-xl transition-all duration-300";
  const glassStyles = glass
    ? "bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50"
    : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700";
  const hoverStyles = hover
    ? "hover:shadow-xl hover:-translate-y-1 cursor-pointer"
    : "shadow-md";

  return (
    <div className={`${baseStyles} ${glassStyles} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
};

// How to use

{/* <Card className="p-6">
  <h2 className="text-xl font-bold">Standard Card</h2>
  <p className="text-gray-600">This is some simple content.</p>
</Card>; */}
