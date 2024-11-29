import { SubTask } from '@/types/todo';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, Edit2, Plus, Save, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface SubTaskListProps {
  subtasks: SubTask[];
  onAdd: (text: string) => void;
  onToggle: (subtaskId: string) => void;
  onDelete: (subtaskId: string) => void;
  onEdit: (subtaskId: string, text: string) => void;
}

export function SubTaskList({
  subtasks,
  onAdd,
  onToggle,
  onDelete,
  onEdit,
}: SubTaskListProps) {
  const [newSubtask, setNewSubtask] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const progress = subtasks.length
    ? Math.round((subtasks.filter(st => st.completed).length / subtasks.length) * 100)
    : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSubtask.trim()) {
      onAdd(newSubtask.trim());
      setNewSubtask('');
    }
  };

  const handleEdit = (subtask: SubTask) => {
    setEditingId(subtask.id);
    setEditText(subtask.text);
  };

  const handleSave = (id: string) => {
    if (editText.trim()) {
      onEdit(id, editText.trim());
      setEditingId(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditText('');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h4 className="text-sm font-medium">Subtasks Progress</h4>
        <span className="text-sm text-muted-foreground">
          {progress}%
        </span>
      </div>
      <Progress value={progress} className="h-2" />
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          value={newSubtask}
          onChange={e => setNewSubtask(e.target.value)}
          placeholder="Add a subtask..."
          className="flex-1"
        />
        <Button type="submit" size="icon" variant="outline">
          <Plus className="h-4 w-4" />
        </Button>
      </form>

      <ul className="space-y-2">
        {subtasks.map(subtask => (
          <li
            key={subtask.id}
            className={cn(
              'flex items-center gap-2 rounded-lg border p-2',
              subtask.completed ? 'bg-muted/50' : 'bg-background'
            )}
          >
            <Checkbox
              checked={subtask.completed}
              onCheckedChange={() => onToggle(subtask.id)}
              className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
            />
            
            {editingId === subtask.id ? (
              <div className="flex flex-1 items-center gap-2">
                <Input
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                  className="flex-1"
                  autoFocus
                />
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleSave(subtask.id)}
                  className="h-8 w-8"
                >
                  <Save className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleCancel}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                <span
                  className={cn(
                    'flex-1',
                    subtask.completed && 'line-through text-muted-foreground'
                  )}
                >
                  {subtask.text}
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleEdit(subtask)}
                  className="h-8 w-8 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-950 dark:hover:text-blue-400"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => onDelete(subtask.id)}
                  className="h-8 w-8 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-950 dark:hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}