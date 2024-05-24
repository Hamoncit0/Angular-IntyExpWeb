import { Injectable } from '@angular/core';
import { Category } from '../interfaces/category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url = 'http://localhost:3000'
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
     return this.http.get<Category[]>(`${this.url}/productoSolo`);
   }
}
