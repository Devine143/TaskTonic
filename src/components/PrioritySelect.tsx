import { Priority } from '@/types/todo';
import { PRIORITY_COLORS, PRIORITY_LABELS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Flag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PrioritySelectProps {
  priority: Priority;
  onPriorityChange: (priority: Priority) => void;
}

export function PrioritySelect({ priority, onPriorityChange }: PrioritySelectProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-muted"
          aria-label={`Priority: ${PRIORITY_LABELS[priority]}`}
        >
          <Flag className={cn('h-4 w-4', {
            'text-blue-500': priority === 'low',
            'text-yellow-500': priority === 'medium',
            'text-red-500': priority === 'high',
          })} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={() => onPriorityChange('low')}>
          <Flag className="mr-2 h-4 w-4 text-blue-500" />
          Low Priority
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onPriorityChange('medium')}>
          <Flag className="mr-2 h-4 w-4 text-yellow-500" />
          Medium Priority
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onPriorityChange('high')}>
          <Flag className="mr-2 h-4 w-4 text-red-500" />
          High Priority
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}