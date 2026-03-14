import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { InventoryDTO } from '../dto/inventoryDTO';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  // Get all inventory items
  getInventory(): Observable<InventoryDTO[]> {
    return this.http.get<InventoryDTO[]>(`${this.apiUrl}/inventory`);
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
  deleteInventory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/inventory/${id}`);
  }

  // Get low stock items
  getLowStockItems(): Observable<InventoryDTO[]> {
    return this.http.get<InventoryDTO[]>(`${this.apiUrl}/inventory/low-stock`);
  }

  // Get total inventory value
  getTotalValue(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/inventory/total-value`);
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
