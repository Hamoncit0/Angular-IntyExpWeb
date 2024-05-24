import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit{
  products: Product[]=[];
  cantidadSeleccionada: number;
  constructor(private productService: ProductService){
    this.cantidadSeleccionada=0;
  }

  ngOnInit() {
    console.log("EMPEZO EL CARRITO");
    this.cantidadSeleccionada=0;
    this.productService.getCart().subscribe((productos: Product[]) => {
      this.products = productos;
      console.log(productos[0]);
    });
  }
  calculateTotal(): number {
    let total = 0;
    this.products.forEach(producto => {
      total += producto.Precio * producto.Cantidad;
    });
    return total;
  }
  removeFromCart(producto:Product){
    console.log("Se quiere quitar: "+ producto.IdProducto)
    this.productService.deleteProductFromCart(producto).subscribe(response => {
      console.log('Producto eliminado del carrito:', producto);
      this.ngOnInit();
    }, error => {
      console.error('Error al agregar al carrito:', error);
    });
    
  }

  updateCantidad(producto:Product){
    producto.Cantidad=this.cantidadSeleccionada;
    this.productService.updateCarrito(producto).subscribe(response => {
      console.log('Producto updateado del carrito:', producto);
      this.ngOnInit();
    }, error => {
      console.error('Error al agregar al carrito:', error);
    });

  }
  emptyCarrito(){
    this.productService.emptyCart().subscribe(response => {
      console.log('Carrito Vaciado');
      this.ngOnInit();
    }, error => {
      console.error('Error al agregar al carrito:', error);
      this.ngOnInit();
    });
  }
  
}
