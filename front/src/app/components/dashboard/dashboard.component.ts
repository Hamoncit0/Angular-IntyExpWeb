import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { Product } from '../../interfaces/product';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductoComponent } from '../producto/producto.component';
import { ProductService } from '../../service/product.service';
import { AutenticacionService } from '../../service/autenticacion.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FooterComponent, ProductListComponent, ProductoComponent, FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tendencias: Product[] = [];
  tendencia!:Product;
  productos:Product[]=[];
  constructor(private productService:ProductService, public authService:AutenticacionService){
    
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

    this.productService.getAllProducts().subscribe((data: Product[])=>{
      this.productos = data;
    }, error=>{
      console.error('ERROR:', error);
    })

  }
}
