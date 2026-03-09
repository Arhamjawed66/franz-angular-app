import { Component, inject, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ThemeService } from '../../services/theme.service';
import { ImageSliderComponent } from '../../components/image-slider/image-slider';
import { ProductService } from '../../services/product.service';
import { ProductDTO } from '../../dto/productDTO';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgxChartsModule, ImageSliderComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  themeService = inject(ThemeService);
  private productService = inject(ProductService);

  chartView: [number, number] = [600, 160];

  // Products from backend
  inventoryItems: { item: string; category: string; stock: string; supplier: string; cost: string; }[] = [];
  
  // Loading state
  isLoading = true;

  constructor() {
    this.updateChartView();
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (products) => {
        // Transform products to inventory items format
        this.inventoryItems = products.slice(0, 5).map((p: ProductDTO) => ({
          item: p.name,
          category: p.description || 'N/A',
          stock: p.stock + ' units',
          supplier: 'Supplier',
          cost: '$' + p.price
        }));
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading products:', err);
        // Fallback to default data if API fails
        this.inventoryItems = [
          { item: "Apples", category: "Food", stock: "180 g", supplier: "Bread", cost: "$450" },
          { item: "Bread", category: "Bakery", stock: "60 g", supplier: "Milk", cost: "$460" },
          { item: "Milk", category: "Storage", stock: "20 g", supplier: "Chicken", cost: "$250" },
          { item: "Chicken", category: "Potato", stock: "600 g", supplier: "Sauce", cost: "$120" },
          { item: "Tomatoes", category: "Fruit", stock: "20 g", supplier: "Tomatoes", cost: "$450" },
        ];
        this.isLoading = false;
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateChartView();
  }

  updateChartView() {
    const width = window.innerWidth;
    if (width < 640) {
      this.chartView = [300, 160];
    } else if (width < 1024) {
      this.chartView = [500, 160];
    } else {
      this.chartView = [600, 160];
    }
  }

  stats: { title: string; value: string; sub?: string; }[] = [
    { title: "Todays Sale", value: "$5,000" },
    { title: "Low in stock", value: "12 Products" },
    { title: "Due Payments", value: "$2,150" },
    { title: "Pending Delivery", value: "3 Orders" },
  ];

  salesData = [
    { name: 'Mon', value: 40 },
    { name: 'Tue', value: 70 },
    { name: 'Wed', value: 50 },
    { name: 'Thu', value: 90 },
  ];

  customColors = [
    { name: 'Sales', value: '#3B82F6' }
  ];

  getCardGradient(index: number): string {
    const gradients = [
      'from-blue-500 to-blue-600',
      'from-green-500 to-green-600',
      'from-purple-500 to-purple-600',
      'from-red-500 to-red-600'
    ];
    return gradients[index % gradients.length];
  }
}
