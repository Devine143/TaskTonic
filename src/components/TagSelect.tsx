import { Tag } from '@/types/todo';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Tag as TagIcon, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TagSelectProps {
  tags: Tag[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

export function TagSelect({ tags, selectedTags, onTagsChange }: TagSelectProps) {
  const toggleTag = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      onTagsChange(selectedTags.filter(id => id !== tagId));
    } else {
      onTagsChange([...selectedTags, tagId]);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-2 hover:bg-muted"
          aria-label="Select tags"
        >
          <TagIcon className="h-4 w-4" />
          {selectedTags.length > 0 ? `${selectedTags.length} tags` : 'Tags'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search tags..." />
          <CommandEmpty>No tags found.</CommandEmpty>
          <CommandGroup>
            {tags.map(tag => (
              <CommandItem
                key={tag.id}
                onSelect={() => toggleTag(tag.id)}
                className="flex items-center gap-2"
              >
                <div
                  className={cn(
                    'h-3 w-3 rounded-full',
                    selectedTags.includes(tag.id) ? 'opacity-100' : 'opacity-50'
                  )}
                  style={{ backgroundColor: tag.color }}
                />
                <span>{tag.name}</span>
                {selectedTags.includes(tag.id) && (
                  <Check className="ml-auto h-4 w-4" />
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}