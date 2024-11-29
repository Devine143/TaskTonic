import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

interface AddTodoProps {
  onAdd: (text: string) => void;
}

export function AddTodo({ onAdd }: AddTodoProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
      toast.success('Todo added successfully');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1"
      />
      <Button 
        type="submit" 
        aria-label="Add todo"
        className="bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-200"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add
      </Button>
    </form>
  );
}