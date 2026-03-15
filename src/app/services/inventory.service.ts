import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { InventoryDTO } from '../dto/inventoryDTO';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  // ⭐ Get all inventory items with Mapping Fix
  getInventory(): Observable<InventoryDTO[]> {
    return this.http.get<any>(`${this.apiUrl}/inventory`).pipe(
      map(res => {
        // Backend data aksar 'data' ya 'content' array ke andar hota hai
        const items = Array.isArray(res) ? res : (res.data || res.content || []);
        
        return items.map((item: any) => ({
          ...item,
          // Agar backend se keys product_name ya product_description hain
          id: item.id || item.product_id,
          name: item.name || item.product_name || item.title || 'Unknown Product',
          description: item.description || item.product_description || item.batch_no || '',
          stock_quantity: item.stock_quantity ?? item.stock ?? 0,
          price: item.price ?? 0
        } as InventoryDTO));
      }),
      catchError(err => {
        console.error('Inventory Fetch Error:', err);
        return of([]); // Error ki surat mein khali array bhej do taake app crash na ho
      })
    );
  }

  // Get inventory item by ID
  getInventoryById(id: number): Observable<InventoryDTO> {
    return this.http.get<InventoryDTO>(`${this.apiUrl}/inventory/${id}`);
  }

  // Add new inventory item
  addInventory(item: InventoryDTO): Observable<InventoryDTO> {
    return this.http.post<InventoryDTO>(`${this.apiUrl}/inventory`, item);
  }

  // Update inventory item
  updateInventory(id: number, item: InventoryDTO): Observable<InventoryDTO> {
    return this.http.put<InventoryDTO>(`${this.apiUrl}/inventory/${id}`, item);
  }

  // Delete inventory item
  deleteInventory(id: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/inventory/${id}`);
  }

  // Get status
  getStatus(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/status`).pipe(
      catchError(error => {
        console.warn('Status check failed:', error.message);
        return of({ status: 'offline' });
      })
    );
  }
}