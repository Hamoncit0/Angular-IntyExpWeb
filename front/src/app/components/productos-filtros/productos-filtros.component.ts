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
  //lista original de productos
  productos: Product[] = [];
  //lista de categorias
  categorias: Category[] = [];
  categoriasHijas: Category[] = [];
  categoriasNietas: Category[] = [];
  //productos filtrados
  productosFiltrados: Product[] = [];

  //campos para filtrar
  precioMin: number = 0;
  precioMax: number = 10000;
  sortOrder: string = 'alphaAsc';

  //categoria seleccionada
  selectedCategory: Category | null = null;
  categoriasActivas: Category[] = [];
  constructor(private productService: ProductService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadCategoriesHijas();
    this.loadCategoriesNietas();
    this.loadProducts();
  }

  loadCategories(): void {
    this.categoryService.getCategorias().subscribe((data: Category[]) => {
      this.categorias = data;
    });
  }
  loadCategoriesHijas(): void {
    this.categoryService.getCategoriasHijas().subscribe((data: Category[]) => {
      this.categoriasHijas = data;
    });
  }
  loadCategoriesNietas(): void {
    this.categoryService.getCategoriasNietas().subscribe((data: Category[]) => {
      this.categoriasNietas = data;
    });
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe((data: Product[]) => {
      this.productos = data;
      this.productosFiltrados = data;
    });
  }

  getSelectedCategories(){
    return this.selectedCategory;
  }
  selectCategory(categoria:Category){
    this.selectedCategory = categoria;
    this.filterProducts();
  }


  filterProducts(): void {
    let filtered = this.productos;
  
    // Filter by selected categories
    if (this.selectedCategory) {
      const selectedCategoryId = this.selectedCategory.IdCategoria;
  
      // Activar categorías seleccionadas
      this.activarCategoriasSeleccionadas(selectedCategoryId);
  
      // Filtrar productos que pertenecen a las categorías activas 
      filtered = filtered.filter(producto => 
        this.categoriasActivas.some(categoria => categoria.IdCategoria === producto.IdCategoria)
       );
    }
  
    // Filter by price range
    filtered = filtered.filter(producto => producto.Precio >= this.precioMin && producto.Precio <= this.precioMax);
  
    this.productosFiltrados = filtered;
    this.sortProducts();
  }
  
  
  // Función para verificar si una categoría o una de sus subcategorías coincide con una categoría seleccionada
  activarCategoriasSeleccionadas(selectedCategoryId: number) {
    this.categoriasActivas = [];
  
    // Agregar categoría padre seleccionada
    for (let i = 0; i < this.categorias.length; i++) {
      if (this.categorias[i].IdCategoria === selectedCategoryId) {
        this.categoriasActivas.push(this.categorias[i]);
        console.log(this.categorias[i].IdCategoria);
      }
    }
  
    // Agregar categorías hijas de la categoría seleccionada
    for (let j = 0; j < this.categoriasHijas.length; j++) {
      if (this.categoriasHijas[j].IdCatParent === selectedCategoryId) {
        this.categoriasActivas.push(this.categoriasHijas[j]);
        console.log(this.categoriasHijas[j].IdCategoria);
      }
    }
  
    // Agregar categorías nietas de las categorías hijas
    for (let j = 0; j < this.categoriasHijas.length; j++) {
      if (this.categoriasHijas[j].IdCatParent === selectedCategoryId) {
        for (let k = 0; k < this.categoriasNietas.length; k++) {
          if (this.categoriasNietas[k].IdCatParent === this.categoriasHijas[j].IdCategoria) {
            this.categoriasActivas.push(this.categoriasNietas[k]);
          }
        }
      }
    }
  
    return this.categoriasActivas;
  }
  
  


  sortProducts(): void {
    switch (this.sortOrder) {
      case 'alphaAsc':
        this.productosFiltrados.sort((a, b) => a.Nombre.localeCompare(b.Nombre));
        break;
      case 'alphaDesc':
        this.productosFiltrados.sort((a, b) => b.Nombre.localeCompare(a.Nombre));
        break;
      case 'priceAsc':
        this.productosFiltrados.sort((a, b) => a.Precio - b.Precio);
        break;
      case 'priceDesc':
        this.productosFiltrados.sort((a, b) => b.Precio - a.Precio);
        break;
    }
  }
}
