import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NotificationComponent } from './components/notification/notification.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavBarComponent, NotificationComponent],
  templateUrl: './app.component.html',
  styleUrls:[ './components/bootstrap.css','./app.component.css']
})
export class AppComponent {
  title = 'front';
}
