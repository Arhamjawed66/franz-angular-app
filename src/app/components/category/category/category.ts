import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface CategoryDTO {
  id: number;
  name: string;
}

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category.html'
})
export class CategoryComponent {
  // Using CategoryDTO[] with Angular signals
  categories = signal<CategoryDTO[]>([
    { id: 1, name: 'Technology' },
    { id: 2, name: 'Health' }
  ]);

  newCategoryName = '';
  editModeId: number | null = null;
  editName = '';

  // CREATE
  createCategory() {
    if (!this.newCategoryName.trim()) return;

    const nextId =
      Math.max(0, ...this.categories().map(c => c.id)) + 1;

    const newCategory: CategoryDTO = {
      id: nextId,
      name: this.newCategoryName.trim()
    };

    this.categories.update(cats => [...cats, newCategory]);

    this.newCategoryName = '';
  }

  // DELETE
  deleteCategory(id: number) {
    this.categories.update(cats => cats.filter(c => c.id !== id));
  }

  // START EDIT
  startEditing(category: CategoryDTO) {
    this.editModeId = category.id;
    this.editName = category.name;
  }

  // UPDATE
  updateCategory(id: number) {
    if (!this.editName.trim()) return;

    this.categories.update(cats =>
      cats.map(c => (c.id === id ? { ...c, name: this.editName.trim() } : c))
    );

    this.editModeId = null;
    this.editName = '';
  }

  cancelEdit() {
    this.editModeId = null;
    this.editName = '';
  }
}
