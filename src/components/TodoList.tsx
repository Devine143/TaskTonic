import { useState } from 'react';
import { Todo } from '@/types/todo';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2, Edit2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export function TodoList({ todos, onToggle, onDelete, onEdit }: TodoListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const handleEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const handleSave = (id: string) => {
    if (editText.trim()) {
      onEdit(id, editText.trim());
      setEditingId(null);
      toast.success('Todo updated successfully');
    }
  };

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">No todos yet. Add one to get started!</p>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {todos.map(todo => (
        <li
          key={todo.id}
          className={cn(
            'flex items-center gap-2 p-4 rounded-lg border',
            'transition-all duration-200 hover:shadow-sm',
            todo.completed && 'bg-muted'
          )}
        >
          <Checkbox
            checked={todo.completed}
            onCheckedChange={() => onToggle(todo.id)}
            aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
          />
          
          {editingId === todo.id ? (
            <Input
              value={editText}
              onChange={e => setEditText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSave(todo.id)}
              onBlur={() => handleSave(todo.id)}
              autoFocus
              className="flex-1"
            />
          ) : (
            <span
              className={cn(
                'flex-1',
                todo.completed && 'line-through text-muted-foreground'
              )}
            >
              {todo.text}
            </span>
          )}

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleEdit(todo)}
              aria-label={`Edit "${todo.text}"`}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                onDelete(todo.id);
                toast.success('Todo deleted successfully');
              }}
              aria-label={`Delete "${todo.text}"`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}