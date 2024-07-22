import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AutenticacionService } from '../../service/autenticacion.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IntrojsService } from '../../service/introjs.service';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{
  busquedaNavBar: string = "";
  constructor(public authService: AutenticacionService, private router:Router, private introjsService:IntrojsService) {}
  ngOnInit(): void {
    const steps = [
      {
        element: document.querySelector('#paso-1-navbar'),
        intro: "¡Bienvenido a DDTech! Somos tu destino para la tecnología de vanguardia y soluciones informáticas innovadoras"
      },
      {
        element: document.querySelector('#paso-2-navbar'),
        intro: "Explora nuestra amplia gama de productos de última generación."
      },
      {
        element: document.querySelector('#paso-3-navbar'),
        intro: "Regístrate para acceder a ofertas exclusivas."
      },
      {
        element: document.querySelector('#paso-4-navbar'),
        intro: "O inicia sesión para ver tu historial de compras."
      },
      {
        element: document.querySelector('#paso-5-navbar'),
        intro: "Crea la PC de tus sueños eligiendo tus componentes favoritos y nosotros la armaremos para tí."
      },
      {
        element: document.querySelector('#paso-6-navbar'),
        intro: "¿Necesitas ayuda o tienes alguna pregunta? ¡Estamos aquí para ayudarte!"
      },
      {
        element: document.querySelector('#paso-7-navbar'),
        intro: "¡Gracias por unirte a DDTech! Explora nuestras ofertas y descubre cómo la tecnología puede mejorar tu vida"
      }
    ];
    this.introjsService.iniciarTutorial(steps);
  }

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
