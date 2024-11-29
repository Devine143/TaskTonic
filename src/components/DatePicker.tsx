import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface DatePickerProps {
  date?: Date;
  onDateChange: (date?: Date) => void;
  label: string;
}

export function DatePicker({ date, onDateChange, label }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            'h-8 gap-2 hover:bg-muted',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="h-4 w-4" />
          {date ? format(date, 'PPP') : label}
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
    </Popover>
  );
}