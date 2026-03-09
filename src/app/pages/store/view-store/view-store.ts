import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-view-store',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-store.html',
  styleUrls: ['./view-store.css']
})
export class ViewStoreComponent {
  themeService = inject(ThemeService);

  stats = [
    { label: "Total Products", value: 124 },
    { label: "Monthly Revenue", value: "$8,420" },
    { label: "Active Orders", value: 36 },
    { label: "Total Customers", value: 980 },
  ];

  chartData = [70, 45, 85, 60, 90, 50];
}