import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { AutenticacionService } from '../../service/autenticacion.service';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [FooterComponent, RouterOutlet, RouterLink, CommonModule],
  templateUrl: './pago.component.html',
  styleUrl: './pago.component.css'
})
export class PagoComponent {
  productos: Product[] = [];
  total:number = 0;
  subtotal:number=0;
  envio:number = 0;
  constructor(private productService:ProductService, public authService:AutenticacionService){

  }


  ngOnInit(): void {
    this.productService.getCart().subscribe((data: Product[]) => {
      this.productos = data;
      console.log("data:", this.productos[0]);
      this.calculateTotal();

    }, error => {
      console.error('Error fetching products:', error);
    });

  }

  calculateTotal() {
    let qtotal = 0;
    this.productos.forEach(producto => {
      qtotal += producto.Precio * producto.Cantidad;
    });
    this.envio= parseFloat((qtotal * 0.15).toFixed(2));;
    this.subtotal=qtotal;
    this.total = this.subtotal+this.envio;
    console.log(this.total);
  }

  comprar(){
    this.productService.comprar(this.productos, this.total).subscribe(response => {
      console.log('Pago exitoso');
    }, error => {
      
      
    });
    
    this.productService.emptyCart().subscribe();
   }
}
