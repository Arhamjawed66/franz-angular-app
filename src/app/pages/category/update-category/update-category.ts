import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../../services/theme.service';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-category.html',
  styleUrls: ['./update-category.css']
})
export class UpdateCategoryComponent implements OnInit {
  themeService = inject(ThemeService);
  categoryService = inject(CategoryService);

  categories: any[] = [];
  selectedId = '';
  form = {
    store_id: '',
    name: '',
    description: '',
    slug: '',
    parent_category_id: '',
  };

  loading = false;
  toast = { show: false, message: '', type: '' };
  errors: { [key: string]: string } = {};

  ngOnInit() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  onNameChange() {
    if (this.form.name) {
      this.form.slug = this.form.name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9\-]/g, '');
    }
  }

  showToast(msg: string, type = 'success') {
    this.toast = { show: true, message: msg, type };
    setTimeout(() => this.toast = { show: false, message: '', type: '' }, 2500);
  }

  onSelect() {
    if (!this.selectedId) {
      this.form = { store_id: '', name: '', description: '', slug: '', parent_category_id: '' };
      return;
    }

    const cat = this.categories.find(c => c._id === this.selectedId);
    if (!cat) return;

    this.form = {
      store_id: cat.store_id || '',
      name: cat.name || '',
      description: cat.description || '',
      slug: cat.slug || '',
      parent_category_id: cat.parent_category_id || '',
    };
  }

  validate(): boolean {
    const newErrors: { [key: string]: string } = {};
    if (!this.form.store_id) newErrors['store_id'] = 'Store ID is required.';
    if (!this.form.name) newErrors['name'] = 'Category name is required.';
    if (!this.form.slug) newErrors['slug'] = 'Slug is required.';
    this.errors = newErrors;
    return Object.keys(newErrors).length === 0;
  }

  handleSubmit() {
    if (!this.validate() || !this.selectedId) {
      this.showToast('Please select a category and fill required fields.', 'error');
      return;
    }

    this.loading = true;
    this.categoryService.updateCategory(this.selectedId, this.form).subscribe({
      next: () => {
        this.showToast('Category updated successfully!', 'success');
      },
      error: () => {
        this.showToast('Something went wrong!', 'error');
      }
    }).add(() => {
      this.loading = false;
    });
  }
}