import { Button } from '@/components/ui/button';
import { TodoFilter } from '@/types/todo';

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
      >
        All
      </Button>
      <Button
        variant={currentFilter === 'active' ? 'default' : 'outline'}
        onClick={() => onFilterChange('active')}
      >
        Active
      </Button>
      <Button
        variant={currentFilter === 'completed' ? 'default' : 'outline'}
        onClick={() => onFilterChange('completed')}
      >
        Completed
      </Button>
    </div>
  );
}