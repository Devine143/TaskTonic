import { Button } from '@/components/ui/button';
import { TodoFilter } from '@/types/todo';
import { cn } from '@/lib/utils';

interface FilterButtonsProps {
  currentFilter: TodoFilter;
  onFilterChange: (filter: TodoFilter) => void;
}

export function FilterButtons({ currentFilter, onFilterChange }: FilterButtonsProps) {
  return (
    <div className="flex gap-2">
      <Button
        variant={currentFilter === 'all' ? 'default' : 'outline'}
        onClick={() => onFilterChange('all')}
        className={cn(
          'transition-all duration-200',
          currentFilter === 'all' && 'bg-primary hover:bg-primary/90'
        )}
      >
        All
      </Button>
      <Button
        variant={currentFilter === 'active' ? 'default' : 'outline'}
        onClick={() => onFilterChange('active')}
        className={cn(
          'transition-all duration-200',
          currentFilter === 'active' && 'bg-blue-600 hover:bg-blue-700'
        )}
      >
        Active
      </Button>
      <Button
        variant={currentFilter === 'completed' ? 'default' : 'outline'}
        onClick={() => onFilterChange('completed')}
        className={cn(
          'transition-all duration-200',
          currentFilter === 'completed' && 'bg-green-600 hover:bg-green-700'
        )}
      >
        Completed
      </Button>
    </div>
  );
}