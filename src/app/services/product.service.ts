import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { ProductDTO } from '../dto/productDTO';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  // ⭐ Get all products with mapping
  getProducts(): Observable<ProductDTO[]> {
    return this.http.get<any>(`${this.apiUrl}/product`).pipe(
      map(res => {
        const items = Array.isArray(res) ? res : (res.data || res.content || []);
        return items.map((p: any) => this.mapToProductDTO(p));
      }),
      catchError(() => of([]))
    );
  }

  getProductById(id: number): Observable<ProductDTO> {
    return this.http.get<any>(`${this.apiUrl}/product/${id}`).pipe(
      map(p => this.mapToProductDTO(p))
    );
  }

  addProduct(product: ProductDTO): Observable<ProductDTO> {
    return this.http.post<ProductDTO>(`${this.apiUrl}/product`, product);
  }

  updateProduct(id: number, product: ProductDTO): Observable<ProductDTO> {
    return this.http.put<ProductDTO>(`${this.apiUrl}/product/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/product/${id}`);
  }

  // ⭐ Helper to fix backend key mismatches
  private mapToProductDTO(p: any): ProductDTO {
    return {
      ...p,
      id: p.id || p.product_id,
      name: p.name || p.product_name || p.title || 'Unnamed Product',
      description: p.description || p.product_description || '',
      price: p.price || p.unit_price || 0,
      stock: p.stock !== undefined ? p.stock : (p.stock_quantity || 0),
      imageUrl: p.imageUrl || p.image_url || 'https://via.placeholder.com/300x200'
    };
  }
}