import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { Product } from '../../interfaces/product';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductoComponent } from '../producto/producto.component';
import { ProductService } from '../../service/product.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FooterComponent, ProductListComponent, ProductoComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tendencias: Product[] = [];
  tendencia!:Product;
  constructor(private productService:ProductService){
    
  }
  ngOnInit(): void {
    this.productService.getTendencias().subscribe((data: Product[]) => {
      this.tendencias = data;
      this.tendencia = this.tendencias[0];

      this.productService.getProduct(this.tendencia.IdProducto).subscribe((data: Product) => {
        this.tendencia = data;
      }, error => {
        console.error('Error fetching products:', error);
      });


    }, error => {
      console.error('Error fetching products:', error);
    });



  }
}
