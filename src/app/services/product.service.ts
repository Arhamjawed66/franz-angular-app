import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductDTO } from '../dto/productDTO';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  // Get all products
  getProducts(): Observable<ProductDTO[]> {
    return this.http.get<ProductDTO[]>(`${this.apiUrl}/product`);
  }

  // Get product by ID
  getProductById(id: number): Observable<ProductDTO> {
    return this.http.get<ProductDTO>(`${this.apiUrl}/product/${id}`);
  }

  // Add new product
  addProduct(product: ProductDTO): Observable<ProductDTO> {
    return this.http.post<ProductDTO>(`${this.apiUrl}/product`, product);
  }

  // Update product
  updateProduct(id: number, product: ProductDTO): Observable<ProductDTO> {
    return this.http.put<ProductDTO>(`${this.apiUrl}/product/${id}`, product);
  }

  // Delete product
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/product/${id}`);
  }

  // Patch product (partial update)
  patchProduct(id: number, product: Partial<ProductDTO>): Observable<ProductDTO> {
    return this.http.patch<ProductDTO>(`${this.apiUrl}/product/${id}`, product);
  }
}
