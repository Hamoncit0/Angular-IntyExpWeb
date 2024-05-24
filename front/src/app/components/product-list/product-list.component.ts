import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../service/product.service';
import { Product } from '../../interfaces/product';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe((data: Product[]) => {
      this.products = data;
    }, error => {
      console.error('Error fetching products:', error);
    });
  }

  addToCart(product: Product) {
    // Aquí va la lógica para agregar al carrito UwU
    console.log('Producto añadido al carrito:', product);
    this.productService.addToCart(product).subscribe(response => {
      console.log('Producto añadido al carrito:', product);
      // Aquí puedes mostrar algún mensaje de éxito o actualizar la UI si es necesario
    }, error => {
      console.error('Error al agregar al carrito:', error);
      // Aquí puedes manejar el error, como mostrar un mensaje al usuario
    });
  }
}
