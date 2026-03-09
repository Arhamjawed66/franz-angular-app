import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Supplier {
  supplier_id?: number;
  store_id: number;
  address_id: number;
  name: string;
  contact_person_name: string;
  contact_person_email: string;
  contact_person_phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private http = inject(HttpClient);
  private apiUrl = '/sb-inventory-service/api/v1/supplier';

  // Get all suppliers
  getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${this.apiUrl}`);
  }

  // Add new supplier
  addSupplier(data: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(`${this.apiUrl}`, data);
  }

  // Update supplier
  updateSupplier(id: number, data: Supplier): Observable<Supplier> {
    return this.http.put<Supplier>(`${this.apiUrl}/${id}`, data);
  }

  // Delete supplier
  deleteSupplier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
