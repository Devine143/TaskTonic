export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  priority: 'low' | 'medium' | 'high';
}

export type TodoFilter = 'all' | 'active' | 'completed';

export interface TodoContextType {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string) => void;
  filter: TodoFilter;
  setFilter: (filter: TodoFilter) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}