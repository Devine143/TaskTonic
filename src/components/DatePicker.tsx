import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DatePickerProps {
  date?: Date;
  onDateChange: (date?: Date) => void;
  label: string;
}

function formatDate(date: Date) {
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const suffix = getDaySuffix(day);
  return `${day}${suffix} ${month}`;
}

function getDaySuffix(day: number) {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

export function DatePicker({ date, onDateChange, label }: DatePickerProps) {
  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              'h-8 gap-2 hover:bg-muted whitespace-nowrap',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="h-4 w-4" />
            {date ? formatDate(date) : label}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {date && (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-muted"
          onClick={() => onDateChange(undefined)}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}