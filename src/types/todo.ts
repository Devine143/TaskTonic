// Core types for the todo system
export type Priority = 'low' | 'medium' | 'high';
export type TodoFilter = 'all' | 'active' | 'completed';

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface SubTask {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  priority: Priority;
  categoryId?: string;
  tags: string[];
  dueDate?: Date;
  subtasks: SubTask[];
  reminder?: Date;
}

export interface TodoContextType {
  todos: Todo[];
  categories: Category[];
  tags: Tag[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string) => void;
  updateTodoPriority: (id: string, priority: Priority) => void;
  updateTodoCategory: (id: string, categoryId: string) => void;
  updateTodoTags: (id: string, tags: string[]) => void;
  updateTodoDueDate: (id: string, dueDate?: Date) => void;
  updateTodoReminder: (id: string, reminder?: Date) => void;
  addSubtask: (todoId: string, text: string) => void;
  toggleSubtask: (todoId: string, subtaskId: string) => void;
  deleteSubtask: (todoId: string, subtaskId: string) => void;
  editSubtask: (todoId: string, subtaskId: string, text: string) => void;
  addCategory: (name: string, color: string) => void;
  editCategory: (id: string, name: string, color: string) => void;
  deleteCategory: (id: string) => void;
  addTag: (name: string, color: string) => void;
  editTag: (id: string, name: string, color: string) => void;
  deleteTag: (id: string) => void;
  filter: TodoFilter;
  setFilter: (filter: TodoFilter) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}