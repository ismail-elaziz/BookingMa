import React from 'react';
import { Search, AlertCircle, FileQuestion, Inbox } from 'lucide-react';

export interface EmptyStateProps {
  icon?: 'search' | 'error' | 'notfound' | 'inbox';
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'inbox',
  title,
  description,
  action,
  className = ''
}) => {
  const icons = {
    search: <Search className="w-16 h-16 text-gray-400" />,
    error: <AlertCircle className="w-16 h-16 text-red-400" />,
    notfound: <FileQuestion className="w-16 h-16 text-gray-400" />,
    inbox: <Inbox className="w-16 h-16 text-gray-400" />,
  };

  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}>
      <div className="mb-4 opacity-50">
        {icons[icon]}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
};
