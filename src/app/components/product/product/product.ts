import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductDTO } from '../../../dto/productDTO';
import { ProductService } from '../../../services/product.service';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.html',
})
export class ProductComponent implements OnInit {
  private productService = inject(ProductService);
  
  // Products from backend
  products = signal<ProductDTO[]>([]);
  
  // Loading state
  isLoading = signal<boolean>(true);
  
  // Error state
  error = signal<string | null>(null);

  // Form visibility flags
  showAddProductForm = false;
  showGetById = false;
  
  // New product form
  newProduct: ProductDTO = {
    name: '',
    description: '',
    price: 0,
    stock: 0,
    barcode: '',
    expiry_date: '',
    imageUrl: '',
    store_id: 1,
    category_id: 1
  };
  
  // Search by ID
  searchId: number | null = null;
  foundProduct: ProductDTO | null = null;
  searchError: string | null = null;

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading.set(true);
    this.error.set(null);
    
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.error.set('Failed to load products. Please try again later.');
        this.isLoading.set(false);
      }
    });
  }

  // Add new product
  addProduct() {
    this.productService.addProduct(this.newProduct).subscribe({
      next: (addedProduct) => {
        this.products.update(products => [...products, addedProduct]);
        this.showAddProductForm = false;
        // Reset form
        this.newProduct = {
          name: '',
          description: '',
          price: 0,
          stock: 0,
          barcode: '',
          expiry_date: '',
          imageUrl: '',
          store_id: 1,
          category_id: 1
        };
        alert('Product added successfully!');
      },
      error: (err) => {
        console.error('Error adding product:', err);
        alert('Failed to add product. Please try again.');
      }
    });
  }

  // Get product by ID
  getProductById() {
    if (!this.searchId) {
      this.searchError = 'Please enter a product ID';
      this.foundProduct = null;
      return;
    }
    
    this.searchError = null;
    this.foundProduct = null;
    
    this.productService.getProductById(this.searchId).subscribe({
      next: (product) => {
        this.foundProduct = product;
      },
      error: (err) => {
        console.error('Error fetching product:', err);
        this.searchError = 'Product not found with ID: ' + this.searchId;
      }
    });
  }

  // Delete product
  deleteProduct(id: number) {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }
    
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.products.update(products => products.filter(p => p.id !== id));
        alert('Product deleted successfully!');
      },
      error: (err) => {
        console.error('Error deleting product:', err);
        alert('Failed to delete product. Please try again.');
      }
    });
  }

  // Add to Cart simulation
  addToCart(product: ProductDTO) {
    const currentStock = product.stock ?? 0;
    if (currentStock > 0) {
      product.stock = currentStock - 1;
      alert(`${product.name} added to cart!`);
    } else {
      alert(`${product.name} is out of stock!`);
    }
  }
}

