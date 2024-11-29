import { Todo, Category, Tag } from '@/types/todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
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

export function TodoList({
  todos,
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
}: TodoListProps) {
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
        <li key={todo.id}>
          <TodoItem
            todo={todo}
            categories={categories}
            tags={tags}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
            onPriorityChange={onPriorityChange}
            onCategoryChange={onCategoryChange}
            onTagsChange={onTagsChange}
            onDueDateChange={onDueDateChange}
            onReminderChange={onReminderChange}
            onAddSubtask={onAddSubtask}
            onToggleSubtask={onToggleSubtask}
            onDeleteSubtask={onDeleteSubtask}
            onEditSubtask={onEditSubtask}
            onAddCategory={onAddCategory}
          />
        </li>
      ))}
    </ul>
  );
}