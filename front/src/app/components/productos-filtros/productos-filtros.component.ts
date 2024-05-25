import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { CategoryService } from '../../service/category.service';
import { Product } from '../../interfaces/product';
import { Category } from '../../interfaces/category';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoComponent } from '../producto/producto.component';
import $ from 'jquery'; 

@Component({
  selector: 'app-productos-filtros',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ProductoComponent],
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
  selectedCategoryHija:Category | null =null;
  selectedCategoryNieta:Category[] = [];
  @ViewChild('categoryList') categoryList: ElementRef | undefined;

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
    this.selectedCategoryHija = null;
    this.selectedCategoryNieta = [];
    console.log(this.selectedCategory);
    this.filterProducts();
     // Expandir o contraer las categorías hijas y nietas
     this.toggleCategories(categoria.IdCategoria);
  }

  selectCategoryHija(categoria:Category){
    
    this.selectedCategoryHija = categoria;
    console.log(this.selectedCategoryHija);
    this.selectedCategory = null;
    this.selectedCategoryNieta = [];
    //this.activarProductospoHijas(categoria.IdCategoria);
    this.filterProducts();
    //this.toggleCategories(categoria.IdCategoria);
    
    const parent = this.categorias.findIndex(cat=>cat.IdCategoria=== categoria.IdCatParent);
    this.selectedCategory = this.categorias[parent];
  }
  selectCategoryNieta(categoria:Category){
    this.selectedCategoryHija = null;
    this.selectedCategory = null;
    const index = this.selectedCategoryNieta.findIndex(cat => cat.IdCategoria === categoria.IdCategoria);
    if (index > -1) {
      this.selectedCategoryNieta.splice(index, 1);
      console.log("Se quito",index);
    } else {
      this.selectedCategoryNieta.push(categoria);
      console.log("Se agrego",categoria);
    }
    this.filterProducts();
    
    const parent = this.categoriasHijas.findIndex(cat=>cat.IdCategoria=== categoria.IdCatParent);
    this.selectedCategoryHija = this.categoriasHijas[parent];
    
    if(this.selectedCategoryNieta.length === 0){
      this.filterProducts();
    }
    const parent1 = this.categorias.findIndex(cat=>cat.IdCategoria=== categoria.IdCatParent);
    this.selectedCategory = this.categorias[parent1];
    
    
  }

  filterProducts(): void {
    let filtered = this.productos;
  
    // Filter by selected categories
    if (this.selectedCategory) {
      let selectedCategoryId = this.selectedCategory.IdCategoria;
  
      // Activar categorías seleccionadas
      this.activarCategoriasSeleccionadas(selectedCategoryId);
  
      // Filtrar productos que pertenecen a las categorías activas 
      filtered = filtered.filter(producto => 
        this.categoriasActivas.some(categoria => categoria.IdCategoria === producto.IdCategoria)
       );
    }
    else if(this.selectedCategoryHija){
      let selectedCategoryId = this.selectedCategoryHija.IdCategoria;
  
      // Activar categorías seleccionadas
      this.activarProductospoHijas(selectedCategoryId);
  
      // Filtrar productos que pertenecen a las categorías activas 
      filtered = filtered.filter(producto => 
        this.categoriasActivas.some(categoria => categoria.IdCategoria === producto.IdCategoria)
       );
    }
    else if (this.selectedCategoryNieta.length > 0) {
      console.log("va a activar por nietas de", this.selectedCategoryNieta)
      let selectedCategoryIds = this.selectedCategoryNieta.map(categoria => categoria.IdCategoria);
      console.log(selectedCategoryIds);
      this.activarProductosporNietas(selectedCategoryIds);
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
      }
    }
  
    // Agregar categorías hijas de la categoría seleccionada
    for (let j = 0; j < this.categoriasHijas.length; j++) {
      if (this.categoriasHijas[j].IdCatParent === selectedCategoryId) {
        this.categoriasActivas.push(this.categoriasHijas[j]);
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
  
  activarProductospoHijas(selectedCategoryId:number){
    console.log("PRODUCTO POR HIJAS"+selectedCategoryId);
    this.categoriasActivas = [];
    for(let hija of this.categoriasHijas){
      if(hija.IdCategoria==selectedCategoryId){
        this.categoriasActivas.push(hija);
        console.log(hija.Categoria);
      }
    }

    for(let hija of this.categoriasHijas){

      if(hija.IdCategoria==selectedCategoryId){
        for(let nieta of this.categoriasNietas){
          if(nieta.IdCatParent == hija.IdCategoria){
            
            this.categoriasActivas.push(nieta);
            console.log(nieta.Categoria);
          }
        }
      }
    }
  }
  activarProductosporNietas(selectedCategoryIds: number[]): void {
    this.categoriasActivas = [];
    for (let nieta of this.categoriasNietas) {
      if (selectedCategoryIds.includes(nieta.IdCategoria)) {
        this.categoriasActivas.push(nieta);
        console.log("se activo:", nieta)
      }
    }
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
  toggleCategories(selectedCategoryId: number): void {
    
    $(this.categoryList?.nativeElement).find('.esconder').hide();
    $(this.categoryList?.nativeElement).find('.category-' + selectedCategoryId).toggle();
  }
  resetear(): void {
    // Resetear campos de filtrado
    this.precioMin = 0;
    this.precioMax = 10000;
    this.sortOrder = 'alphaAsc';
  
    // Resetear categorías seleccionadas
    this.selectedCategory = null;
    this.selectedCategoryHija = null;
    this.selectedCategoryNieta = [];
  
    // Limpiar productos filtrados
    this.productosFiltrados = this.productos;
  
    // Limpiar categorías activas
    this.categoriasActivas = [];
  
    // Cerrar todas las categorías desplegadas
    $(this.categoryList?.nativeElement).find('.esconder').hide();
  }



}
