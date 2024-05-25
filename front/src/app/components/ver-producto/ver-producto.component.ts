import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ver-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-producto.component.html',
  styleUrl: './ver-producto.component.css'
})
export class VerProductoComponent implements OnInit{
  producto!:Product;
  constructor(private productService:ProductService, private route: ActivatedRoute){

  }

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.getProduct(id);
      }
    });
  }

  getProduct(id: number): void {
    this.productService.getProduct(id).subscribe(
      (data: Product) => {
        this.producto = data;
        console.log("producto obtenido");
      },
      error => {
        console.error('Error fetching product:', error);
      }
    );
  }

  addToCart() {
    // Aquí va la lógica para agregar al carrito UwU
    console.log('Producto añadido al carrito:', this.producto);
    this.productService.addToCart(this.producto).subscribe(response => {
      console.log('Producto añadido al carrito:', this.producto);
    }, error => {
      console.error('Error al agregar al carrito:', error);
    });
  }
}
