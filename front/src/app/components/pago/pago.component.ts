import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProductService } from '../../service/product.service';
@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [FooterComponent, RouterOutlet, RouterLink],
  templateUrl: './pago.component.html',
  styleUrl: './pago.component.css'
})
export class PagoComponent {
  constructor(private productService:ProductService){

  }

  comprar(){
    this.productService.comprar().subscribe(response => {
      console.log('Pago exitoso');
    }, error => {
      console.error('Error al pagar', error);
      
    });
  }
}
