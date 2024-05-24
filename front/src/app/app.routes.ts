import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AppComponent } from './app.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { PagoComponent } from './components/pago/pago.component';
import { PagoExitosoComponent } from './components/pago-exitoso/pago-exitoso.component';
import { VerProductoComponent } from './components/ver-producto/ver-producto.component';
import { ProductosFiltrosComponent } from './components/productos-filtros/productos-filtros.component';
export const routes: Routes = [
    {path:'', component:DashboardComponent},
    {path:'register', component:RegisterComponent},
    {path:'login', component:LoginComponent},
    {path:'dashboard', component:DashboardComponent},
    {path:'carrito', component:CarritoComponent},
    {path:'pago', component:PagoComponent},
    {path:'pago-exitoso', component:PagoExitosoComponent},
    {path: 'producto/:id', component: VerProductoComponent },
    {path: 'productosFiltros', component: ProductosFiltrosComponent}
];
