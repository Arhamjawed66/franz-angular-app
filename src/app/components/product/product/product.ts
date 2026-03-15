import { Component, signal, inject, OnInit } from '@angular/core'; // ✅ Sahi
import { CommonModule } from '@angular/common'; // CommonModule yahan se hi aayega
import { FormsModule } from '@angular/forms';
import { ProductDTO } from '../../../dto/productDTO';
import { ProductService } from '../../../services/product.service';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.html',
})
export class ProductComponent implements OnInit {
  private productService = inject(ProductService);
  public themeService = inject(ThemeService);
  
  // Data Signals
  products = signal<ProductDTO[]>([]);
  isLoading = signal<boolean>(true);
  
  // Form/Search UI Signals
  showAddForm = signal<boolean>(false);
  showSearchById = signal<boolean>(false);
  
  // Search logic
  searchId = signal<number | null>(null);
  foundProduct = signal<ProductDTO | null>(null);

  // New Product Model (Based on your DTO)
  newProduct = signal<ProductDTO>({
    name: '',
    description: '',
    price: 0,
    cost_price: 0,
    stock: 0,
    sku: '',
    barcode: '',
    tax_rate: 0,
    tax_type: 'VAT',
    store_id: 1,
    category_id: 1,
    is_perishable: false,
    is_visible_in_mobile_app: true,
    imageUrl: ''
  });

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading.set(true);
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products.set(data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  addProduct() {
    this.productService.addProduct(this.newProduct()).subscribe({
      next: (res) => {
        this.products.update(prev => [res, ...prev]);
        this.showAddForm.set(false);
        this.resetForm();
      }
    });
  }

  getProductById() {
    if (!this.searchId()) return;
    this.productService.getProductById(this.searchId()!).subscribe({
      next: (p) => this.foundProduct.set(p),
      error: () => alert('Product not found!')
    });
  }

  deleteProduct(id: number | undefined) {
    if (id && confirm('Are you sure?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => this.products.update(list => list.filter(p => p.id !== id))
      });
    }
  }

  private resetForm() {
    this.newProduct.set({
      name: '', description: '', price: 0, cost_price: 0, stock: 0,
      sku: '', barcode: '', tax_rate: 0, tax_type: 'VAT',
      store_id: 1, category_id: 1, is_perishable: false,
      is_visible_in_mobile_app: true, imageUrl: ''
    });
  }
}