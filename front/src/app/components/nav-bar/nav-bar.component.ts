import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AutenticacionService } from '../../service/autenticacion.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  busquedaNavBar: string = "";
  constructor(public authService: AutenticacionService, private router:Router) {}
  logout() {
    this.authService.logout();
  }
  onSearch() {
    if (this.busquedaNavBar) {
      this.router.navigate(['/productosFiltros'], { queryParams: { busqueda: this.busquedaNavBar } });
      this.busquedaNavBar = "";
    }
  }
}
