import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../service/product.service';
import { CommonModule } from '@angular/common';
import { ProductoComponent } from '../producto/producto.component';

@Component({
  selector: 'app-tendencias',
  standalone: true,
  imports: [CommonModule, ProductoComponent],
  templateUrl: './tendencias.component.html',
  styleUrl: './tendencias.component.css'
})
export class TendenciasComponent implements OnInit{
  tendencias: Product[] = [];
  
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getTendencias().subscribe((data: Product[]) => {
      this.tendencias = data;
    });
  }
}
