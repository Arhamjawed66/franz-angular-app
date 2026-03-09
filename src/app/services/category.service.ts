import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  createCategory(data: any): Observable<any> {
    return this.http.post('/category', data);
  }

  getCategories(): Observable<any> {
    return this.http.get('/category');
  }

  updateCategory(id: string, data: any): Observable<any> {
    return this.http.put(`/category/${id}`, data);
  }

  patchCategory(id: string, data: any): Observable<any> {
    return this.http.patch(`/category/${id}`, data);
  }
}
