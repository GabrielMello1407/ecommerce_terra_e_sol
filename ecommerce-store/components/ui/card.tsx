import { cn } from '@/lib/utils';
import React, { HTMLAttributes } from 'react';

type CardProps = HTMLAttributes<HTMLDivElement> & {};

export const Card: React.FC<CardProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'rounded-lg border bg-white p-4 shadow-sm dark:bg-gray-800 dark:border-gray-700',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

type CardHeaderProps = HTMLAttributes<HTMLDivElement> & {};

export const CardHeader: React.FC<CardHeaderProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn('mb-4 border-b pb-2 text-xl font-semibold', className)}
      {...props}
    >
      {children}
    </div>
  );
};

type CardTitleProps = HTMLAttributes<HTMLHeadingElement> & {};

export const CardTitle: React.FC<CardTitleProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <h2 className={cn('text-gray-900 dark:text-white', className)} {...props}>
      {children}
    </h2>
  );
};

type CardContentProps = HTMLAttributes<HTMLDivElement> & {};

export const CardContent: React.FC<CardContentProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn('text-gray-700 dark:text-gray-400', className)}
      {...props}
    >
      {children}
    </div>
  );
};
