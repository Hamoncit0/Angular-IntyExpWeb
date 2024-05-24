import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AutenticacionService } from '../../service/autenticacion.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  constructor(public authService: AutenticacionService) {}
  logout() {
    this.authService.logout();
  }
}
