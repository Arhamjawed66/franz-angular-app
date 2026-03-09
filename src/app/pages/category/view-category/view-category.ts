import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-view-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-category.html',
  styleUrls: ['./view-category.css']
})
export class ViewCategoryComponent implements OnInit {
  themeService = inject(ThemeService);
  categoryService = inject(CategoryService);

  categories: any[] = [];

  ngOnInit() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }
}