import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Todo, Category, Tag } from "@/types/todo";
import { TodoItem } from "./TodoItem";
import { GripVertical } from "lucide-react";

interface DraggableTodoItemProps {
  todo: Todo;
  categories: Category[];
  tags: Tag[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onPriorityChange: (id: string, priority: Todo["priority"]) => void;
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

export function DraggableTodoItem({
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
}: DraggableTodoItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2"
    >
      <button
        className="p-2 hover:bg-muted rounded-lg cursor-grab active:cursor-grabbing touch-none"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </button>
      <div className="flex-1">
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
      </div>
    </div>
  );
}