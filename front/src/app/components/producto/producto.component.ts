import { Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../service/product.service';
import { Product } from '../../interfaces/product';
import { Router } from '@angular/router';
@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent implements OnChanges{
  @Input() id: number=0;
  @Input() nombre: string = '';
  @Input() marca: string = '';
  @Input() descripcion: string = '';
  @Input() imagenUrl: string = '';
  @Input() precio: number = 0;
  @Input() idCat: number = 0;
  producto:Product ={IdProducto:this.id, Nombre:this.nombre, Marca:this.marca,Detalles:this.descripcion, Imagen:this.imagenUrl, Precio:this.precio, IdCategoria:this.idCat, Cantidad:0}
  constructor(public productService:ProductService, private router:Router){

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (['id'] ||['nombre'] || ['marca'] || ['descripcion'] || ['imagenUrl'] || ['precio'] || ['idCat']) {
      this.producto = {
        IdProducto: this.id,
        Nombre: this.nombre,
        Marca: this.marca,
        Detalles: this.descripcion,
        Imagen: this.imagenUrl,
        Precio: this.precio,
        IdCategoria: this.idCat,
        Cantidad: 0
      };
    }
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
  verMas(){
    this.router.navigate(['/producto', this.producto.IdProducto]);
  }


}
