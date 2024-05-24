import { Component } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { CategoryService } from '../../service/category.service';
import { Product } from '../../interfaces/product';
import { Category } from '../../interfaces/category';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-productos-filtros',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './productos-filtros.component.html',
  styleUrl: './productos-filtros.component.css'
})
export class ProductosFiltrosComponent {
  productos: Product[] = [];
  categorias: Category[] = [];
  productosFiltrados: Product[] = [];
  precioMin: number = 0;
  precioMax: number = 10000;

  constructor(private productService: ProductService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((data: Category[]) => {
      this.categorias = data;
    });
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe((data: Product[]) => {
      this.productos = data;
      this.productosFiltrados = data;
    });
  }

  selectCategory(categoria: Category): void {
    this.productosFiltrados = this.productos.filter(producto => producto.IdCategoria === categoria.IdCategoria);
  }

  filterByPrice(): void {
    this.productosFiltrados = this.productos.filter(producto => producto.Precio >= this.precioMin && producto.Precio <= this.precioMax);
  }
}
