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

  getProduct(productoid: number): Observable<Product> {
   const ProductoId = productoid;
    return this.http.post<Product>(`${this.url}/productoSolo`, { ProductoId });
  }
  
  addToCart(product: Product): Observable<any> {
    var UsuarioId =this.authService.currentUser?.Id_Usu;
    const ProductoId = product.IdProducto;
    console.log("ID USUARIO AL AGREGAR AL CARRITO" + UsuarioId);
    console.log(this.authService.currentUser);
    return this.http.post<any>(`${this.url}/agregarCarrito`, { ProductoId, UsuarioId });
  }
  getCart(): Observable<Product[]> {
    const UsuarioId = this.authService.currentUser?.Id_Usu;
    console.log("ID USUARIO AL OBTENER CARRITO" + UsuarioId);
    console.log(this.authService.currentUser);
    return this.http.post<Product[]>(`${this.url}/mostrarCarrito`, { UsuarioId });
  }
  deleteProductFromCart(product: Product): Observable<any> {
    const UsuarioId = this.authService.currentUser?.Id_Usu;
    const ProductoId = product.IdProducto;
    console.log("ID USUARIO AL ELIMINAR DEL CARRITO" + UsuarioId);
    console.log(this.authService.currentUser);
    return this.http.post<any>(`${this.url}/borrarProductoCarrito`, { ProductoId, UsuarioId });
  }
  updateCarrito(product: Product): Observable<any> {
    const UsuarioId = this.authService.currentUser?.Id_Usu;
    const ProductoId = product.IdProducto;
    const Cantidad = product.Cantidad;
    return this.http.post<any>(`${this.url}/modificarCarrito`, {ProductoId, UsuarioId, Cantidad});
  }
  
  emptyCart(): Observable<any> {
    const UsuarioId = this.authService.currentUser?.Id_Usu;
    return this.http.post<any>(`${this.url}/borrarCarrito`, {UsuarioId});
  }
  comprar():Observable<any> {
    const UsuarioId = this.authService.currentUser?.Id_Usu;
    return this.http.post<any>(`${this.url}/pagar`, {UsuarioId})
  }
}
