import { AddTodo } from '@/components/AddTodo';
import { TodoList } from '@/components/TodoList';
import { FilterButtons } from '@/components/FilterButtons';
import { SearchBar } from '@/components/SearchBar';
import { useTodos } from '@/hooks/useTodos';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';

function App() {
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
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
          <h1 className="text-4xl font-bold">TaskTonic</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
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
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default App;