import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onActionClick?: () => void;
}
export const EmptyState: React.FC<EmptyStateProps> = ({ title, description, actionText, onActionClick }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 border-2 border-dashed rounded-lg">
      <h3 className="text-xl font-semibold text-deep-slate">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      {actionText && onActionClick && (
        <Button className="mt-4" onClick={onActionClick}>
          <PlusCircle className="mr-2 h-4 w-4" />
          {actionText}
        </Button>
      )}
    </div>
  );
};