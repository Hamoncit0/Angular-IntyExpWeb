import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ProductListComponent } from './components/product-list/product-list.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RegisterComponent, NavBarComponent, ProductListComponent],
  templateUrl: './app.component.html',
  styleUrls:[ './components/bootstrap.css','./app.component.css']
})
export class AppComponent {
  title = 'front';
}
