import { Todo, Category, Tag } from '@/types/todo';
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { DraggableTodoItem } from './DraggableTodoItem';

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
  onReorder: (startIndex: number, endIndex: number) => void;
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
  onReorder,
}: TodoListProps) {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 8,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = todos.findIndex((todo) => todo.id === active.id);
      const newIndex = todos.findIndex((todo) => todo.id === over.id);
      onReorder(oldIndex, newIndex);
    }
  };

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">
          No todos yet. Add one to get started!
        </p>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={todos} strategy={verticalListSortingStrategy}>
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li key={todo.id}>
              <DraggableTodoItem
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
      </SortableContext>
    </DndContext>
  );
}