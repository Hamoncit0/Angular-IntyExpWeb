import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutenticacionService } from './autenticacion.service';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = 'http://localhost:3000'
  constructor(private http: HttpClient, public authService:AutenticacionService) {}
  
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/products`);
  }
  
  addToCart(product: Product): Observable<any> {
    var UsuarioId =this.authService.currentUser?.Id_Usu;
    const ProductoId = product.IdProducto;
    console.log("ID USUARIO AL AGREGAR AL CARRITO" + UsuarioId);
    console.log(this.authService.currentUser);
    return this.http.post<any>(`${this.url}/agregarCarrito`, { ProductoId, UsuarioId });
  }
}
