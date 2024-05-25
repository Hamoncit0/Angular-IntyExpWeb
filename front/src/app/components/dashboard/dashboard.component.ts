import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { Product } from '../../interfaces/product';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductoComponent } from '../producto/producto.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FooterComponent, ProductListComponent, ProductoComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

}
