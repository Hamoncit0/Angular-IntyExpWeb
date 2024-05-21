import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = 'http://localhost:3000'
  constructor(private http: HttpClient) {}
  
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/products`);
  }
}
