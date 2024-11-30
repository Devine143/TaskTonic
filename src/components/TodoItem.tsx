import { useState } from 'react';
import { Todo, Category, Tag } from '@/types/todo';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Edit2, ChevronDown, ChevronRight } from 'lucide-react';
import { PrioritySelect } from './PrioritySelect';
import { CategorySelect } from './CategorySelect';
import { TagSelect } from './TagSelect';
import { DatePicker } from './DatePicker';
import { SubTaskList } from './SubTaskList';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface TodoItemProps {
  todo: Todo;
  categories: Category[];
  tags: Tag[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onPriorityChange: (id: string, priority: Todo['priority']) => void;
  onCategoryChange: (id: string, categoryId: string) => void;
  onTagsChange: (id: string, tags: string[]) => void;
  onDueDateChange: (id: string, date?: Date) => void;
  onReminderChange: (id: string, date?: Date) => void;
  onAddSubtask: (todoId: string, text: string) => void;
  onToggleSubtask: (todoId: string, subtaskId: string) => void;
  onDeleteSubtask: (todoId: string, subtaskId: string) => void;
  onEditSubtask: (todoId: string, subtaskId: string, text: string) => void;
  onAddCategory: (name: string, color: string) => void;
}

export function TodoItem({
  todo,
  categories,
  tags,
  onToggle,
  onDelete,
  onEdit,
  onPriorityChange,
  onCategoryChange,
  onTagsChange,
  onDueDateChange,
  onReminderChange,
  onAddSubtask,
  onToggleSubtask,
  onDeleteSubtask,
  onEditSubtask,
  onAddCategory,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  const selectedCategory = categories.find(c => c.id === todo.categoryId);
  const selectedTags = tags.filter(tag => todo.tags.includes(tag.id));

  return (
    <Collapsible
      open={isExpanded}
      onOpenChange={setIsExpanded}
      className={cn(
        'rounded-lg border bg-card transition-all duration-200 hover:shadow-md',
        todo.completed && 'bg-muted/50'
      )}
    >
      <div className="grid grid-cols-[auto_auto_1fr_auto] items-center gap-4 p-4">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={() => onToggle(todo.id)}
          className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
        />

        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 p-0 hover:bg-muted"
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </CollapsibleTrigger>

        {isEditing ? (
          <div className="flex items-center gap-2 col-span-2">
            <Input
              value={editText}
              onChange={e => setEditText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSave()}
              onBlur={handleSave}
              className="flex-1"
              autoFocus
            />
          </div>
        ) : (
          <>
            <span
              className={cn(
                'min-w-[200px]',
                todo.completed && 'line-through text-muted-foreground'
              )}
            >
              {todo.text}
            </span>

            <div className="flex items-center gap-4 justify-end">
              <div className="flex items-center gap-1 min-w-[120px]">
                <PrioritySelect
                  priority={todo.priority}
                  onPriorityChange={priority => onPriorityChange(todo.id, priority)}
                />
              </div>

              <div className="flex items-center gap-1 min-w-[120px]">
                <CategorySelect
                  categories={categories}
                  selectedCategoryId={todo.categoryId}
                  onCategoryChange={categoryId => onCategoryChange(todo.id, categoryId)}
                  onAddCategory={onAddCategory}
                />
              </div>

              <div className="flex items-center gap-1 min-w-[120px]">
                <TagSelect
                  tags={tags}
                  selectedTags={todo.tags}
                  onTagsChange={tags => onTagsChange(todo.id, tags)}
                />
              </div>

              <div className="flex items-center gap-1 min-w-[200px]">
                <DatePicker
                  date={todo.dueDate}
                  onDateChange={date => onDueDateChange(todo.id, date)}
                  label="Due date"
                />
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleEdit}
                  className="h-8 w-8 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-950 dark:hover:text-blue-400"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(todo.id)}
                  className="h-8 w-8 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-950 dark:hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      <CollapsibleContent>
        <div className="border-t p-4">
          <SubTaskList
            subtasks={todo.subtasks}
            onAdd={text => onAddSubtask(todo.id, text)}
            onToggle={subtaskId => onToggleSubtask(todo.id, subtaskId)}
            onDelete={subtaskId => onDeleteSubtask(todo.id, subtaskId)}
            onEdit={(subtaskId, text) => onEditSubtask(todo.id, subtaskId, text)}
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}