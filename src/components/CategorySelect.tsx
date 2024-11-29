import { Category } from '@/types/todo';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Folder, Plus } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CategorySelectProps {
  categories: Category[];
  selectedCategoryId?: string;
  onCategoryChange: (categoryId: string) => void;
  onAddCategory: (name: string, color: string) => void;
}

export function CategorySelect({
  categories,
  selectedCategoryId,
  onCategoryChange,
  onAddCategory,
}: CategorySelectProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryColor, setNewCategoryColor] = useState('#4F46E5');

  const selectedCategory = categories.find(c => c.id === selectedCategoryId);

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategoryName.trim()) {
      onAddCategory(newCategoryName.trim(), newCategoryColor);
      setNewCategoryName('');
      setNewCategoryColor('#4F46E5');
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-2 hover:bg-muted"
          >
            <Folder
              className="h-4 w-4"
              style={{ color: selectedCategory?.color }}
            />
            {selectedCategory?.name || 'No Category'}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          {categories.map(category => (
            <DropdownMenuItem
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
            >
              <Folder className="mr-2 h-4 w-4" style={{ color: category.color }} />
              {category.name}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddCategory} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="categoryName">Name</Label>
                  <Input
                    id="categoryName"
                    value={newCategoryName}
                    onChange={e => setNewCategoryName(e.target.value)}
                    placeholder="Category name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="categoryColor">Color</Label>
                  <Input
                    id="categoryColor"
                    type="color"
                    value={newCategoryColor}
                    onChange={e => setNewCategoryColor(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Add Category
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}