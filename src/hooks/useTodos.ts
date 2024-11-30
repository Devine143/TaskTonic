import { useState, useCallback, useEffect } from 'react';
import { Todo, TodoFilter, Category, Priority, SubTask } from '@/types/todo';
import { DEFAULT_CATEGORIES } from '@/lib/constants';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      try {
        return JSON.parse(saved).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          updatedAt: new Date(todo.updatedAt),
          dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
          reminder: todo.reminder ? new Date(todo.reminder) : undefined,
          subtasks: todo.subtasks || [],
        }));
      } catch (e) {
        console.error('Failed to parse todos from localStorage:', e);
        return [];
      }
    }
    return [];
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('categories');
    return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
  });

  const [filter, setFilter] = useState<TodoFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const addTodo = useCallback((text: string) => {
    setTodos(prev => [
      {
        id: crypto.randomUUID(),
        text,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        priority: 'medium' as Priority,
        subtasks: [],
      },
      ...prev,
    ]);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
          : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const editTodo = useCallback((id: string, text: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, text, updatedAt: new Date() } : todo
      )
    );
  }, []);

  const reorderTodos = useCallback((startIndex: number, endIndex: number) => {
    setTodos(prev => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  }, []);

  const updateTodoPriority = useCallback((id: string, priority: Priority) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, priority, updatedAt: new Date() } : todo
      )
    );
  }, []);

  const updateTodoCategory = useCallback((id: string, categoryId: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, categoryId, updatedAt: new Date() } : todo
      )
    );
  }, []);

  const updateTodoDueDate = useCallback((id: string, dueDate?: Date) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, dueDate, updatedAt: new Date() } : todo
      )
    );
  }, []);

  const updateTodoReminder = useCallback((id: string, reminder?: Date) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, reminder, updatedAt: new Date() } : todo
      )
    );
  }, []);

  const addSubtask = useCallback((todoId: string, text: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === todoId
          ? {
              ...todo,
              subtasks: [
                ...todo.subtasks,
                {
                  id: crypto.randomUUID(),
                  text,
                  completed: false,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
              ],
              updatedAt: new Date(),
            }
          : todo
      )
    );
  }, []);

  const toggleSubtask = useCallback((todoId: string, subtaskId: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === todoId
          ? {
              ...todo,
              subtasks: todo.subtasks.map(subtask =>
                subtask.id === subtaskId
                  ? { ...subtask, completed: !subtask.completed }
                  : subtask
              ),
              updatedAt: new Date(),
            }
          : todo
      )
    );
  }, []);

  const deleteSubtask = useCallback((todoId: string, subtaskId: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === todoId
          ? {
              ...todo,
              subtasks: todo.subtasks.filter(
                subtask => subtask.id !== subtaskId
              ),
              updatedAt: new Date(),
            }
          : todo
      )
    );
  }, []);

  const editSubtask = useCallback(
    (todoId: string, subtaskId: string, text: string) => {
      setTodos(prev =>
        prev.map(todo =>
          todo.id === todoId
            ? {
                ...todo,
                subtasks: todo.subtasks.map(subtask =>
                  subtask.id === subtaskId
                    ? { ...subtask, text, updatedAt: new Date() }
                    : subtask
                ),
                updatedAt: new Date(),
              }
            : todo
        )
      );
    },
    []
  );

  const addCategory = useCallback((name: string, color: string) => {
    setCategories(prev => [
      ...prev,
      { id: crypto.randomUUID(), name, color },
    ]);
  }, []);

  const editCategory = useCallback(
    (id: string, name: string, color: string) => {
      setCategories(prev =>
        prev.map(category =>
          category.id === id ? { ...category, name, color } : category
        )
      );
    },
    []
  );

  const deleteCategory = useCallback((id: string) => {
    setCategories(prev => prev.filter(category => category.id !== id));
    setTodos(prev =>
      prev.map(todo =>
        todo.categoryId === id
          ? { ...todo, categoryId: undefined, updatedAt: new Date() }
          : todo
      )
    );
  }, []);

  return {
    todos,
    categories,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    reorderTodos,
    updateTodoPriority,
    updateTodoCategory,
    updateTodoDueDate,
    updateTodoReminder,
    addSubtask,
    toggleSubtask,
    deleteSubtask,
    editSubtask,
    addCategory,
    editCategory,
    deleteCategory,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
  };
}