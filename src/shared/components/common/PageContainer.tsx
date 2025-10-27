import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({ 
  children, 
  title,
  subtitle,
  gradientFrom = 'blue',
  gradientTo = 'indigo'
}) => {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-${gradientFrom}-50 to-${gradientTo}-50 p-8`}>
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <div className="mb-8">
            {title && (
              <h1 className={`text-5xl font-bold mb-4 bg-gradient-to-r from-${gradientFrom}-600 to-${gradientTo}-600 text-transparent bg-clip-text`}>
                {title}
              </h1>
            )}
            {subtitle && <p className="text-gray-600 text-lg">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default PageContainer;

