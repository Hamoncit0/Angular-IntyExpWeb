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
  
  //MOSTRAR PRODUCTOS
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/products/category`);
  }

  getProduct(productoid: number): Observable<Product> {
   const ProductoId = productoid;
    return this.http.post<Product>(`${this.url}/productoSolo`, { ProductoId });
  }
  
  ///CARRITO
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

  comprar(Productos:Product[], total:number):Observable<any> {
    const UsuarioId = this.authService.currentUser?.Id_Usu;
    const Total = total;
    const productos = Productos.map(producto => ({
      IdProducto: producto.IdProducto,
      Cantidad: producto.Cantidad
    }));
    console.log({ UsuarioId, Total, productos });
    return this.http.post<any>(`${this.url}/comprar`, {UsuarioId, Total, productos})
  }


  ///DASHBAORD
  
  getTendencias(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/tendencias`);
  }
}
