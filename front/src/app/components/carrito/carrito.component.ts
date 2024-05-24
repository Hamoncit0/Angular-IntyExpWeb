import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit{
  products: Product[]=[];
  constructor(private productService: ProductService){}

  ngOnInit() {
    console.log("EMPEZO EL CARRITO");
    this.productService.getCart().subscribe((productos: Product[]) => {
      this.products = productos;
      console.log(productos[0]);
    });
  }
  Subtotal(){
    
  }
  
}
