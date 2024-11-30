import { AddTodo } from '@/components/AddTodo';
import { TodoList } from '@/components/TodoList';
import { FilterButtons } from '@/components/FilterButtons';
import { SearchBar } from '@/components/SearchBar';
import { useTodos } from '@/hooks/useTodos';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';

export default function App() {
  const {
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
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
  } = useTodos();

  const { theme, setTheme } = useTheme();

  const filteredTodos = todos
    .filter(todo => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    })
    .filter(todo =>
      todo.text.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 text-transparent bg-clip-text">
            TaskTonic
          </h1>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="border-2 hover:border-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </header>

        <div className="space-y-6">
          <AddTodo onAdd={addTodo} />
          
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <FilterButtons
              currentFilter={filter}
              onFilterChange={setFilter}
            />
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </div>

          <TodoList
            todos={filteredTodos}
            categories={categories}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
            onPriorityChange={updateTodoPriority}
            onCategoryChange={updateTodoCategory}
            onDueDateChange={updateTodoDueDate}
            onReminderChange={updateTodoReminder}
            onAddSubtask={addSubtask}
            onToggleSubtask={toggleSubtask}
            onDeleteSubtask={deleteSubtask}
            onEditSubtask={editSubtask}
            onAddCategory={addCategory}
            onReorder={reorderTodos}
          />
        </div>
      </div>
      <Toaster />
    </div>
  );
}