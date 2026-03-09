import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../../services/theme.service';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-category.html',
  styleUrls: ['./create-category.css']
})
export class CreateCategoryComponent {
  themeService = inject(ThemeService);
  categoryService = inject(CategoryService);

  form = {
    store_id: '',
    name: '',
    description: '',
    slug: '',
    parent_category_id: '',
    image: null as File | null,
  };

  loading = false;
  toast = { show: false, message: '', type: '' };
  errors: { [key: string]: string } = {};
  imagePreview: string | ArrayBuffer | null = null;

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

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length) {
      const file = target.files[0];
      this.form.image = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
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
    if (!this.validate()) return;

    this.loading = true;
    const formData = new FormData();
    Object.keys(this.form).forEach(key => {
      const value = this.form[key as keyof typeof this.form];
      if (value !== null) {
        formData.append(key, value as any);
      }
    });

    this.categoryService.createCategory(formData).subscribe({
      next: () => {
        this.showToast('Category Created Successfully!', 'success');
        this.resetForm();
      },
      error: () => {
        this.showToast('Something went wrong!', 'error');
      }
    }).add(() => {
      this.loading = false;
    });
  }

  resetForm() {
    this.form = {
      store_id: '',
      name: '',
      description: '',
      slug: '',
      parent_category_id: '',
      image: null,
    };
    this.errors = {};
    this.imagePreview = null;
  }
}