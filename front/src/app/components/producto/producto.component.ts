import { Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../service/product.service';
import { Product } from '../../interfaces/product';
import { Router } from '@angular/router';
import { NotificationService } from '../../service/notification.service';
import { AutenticacionService } from '../../service/autenticacion.service';
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
  constructor(public productService:ProductService, private router:Router, private notificationService:NotificationService, public authService:AutenticacionService){

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
    if(this.authService.currentUser){
        console.log('Producto añadido al carrito:', this.producto);
        this.productService.addToCart(this.producto).subscribe(response => {
          console.log('Producto añadido al carrito:', this.producto);
        }, error => {
          console.error('Error al agregar al carrito:', error);
        });
        this.notificationService.showNotification('Producto agregado con éxito');
      }else{
          this.notificationService.showNotification('Inicia sesión para porder agregar productos al carrito.');
    }
   
  }
  verMas(){
    this.router.navigate(['/producto', this.producto.IdProducto]);
  }


}
