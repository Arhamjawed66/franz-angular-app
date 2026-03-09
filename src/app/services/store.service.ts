import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { }

  getStores(): Observable<any> {
    return this.http.get('/store');
  }

  createStore(data: any): Observable<any> {
    return this.http.post('/store', data);
  }

  getStoreById(id: string): Observable<any> {
    return this.http.get(`/store/${id}`);
  }

  updateStore(id: string, data: any): Observable<any> {
    return this.http.put(`/store/${id}`, data);
  }
}
