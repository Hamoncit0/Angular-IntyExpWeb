import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../interfaces/user';
import { UserService } from '../../service/user.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { AutenticacionService } from '../../service/autenticacion.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, RouterOutlet, RouterLink, FooterComponent, CommonModule],
  providers:[UserService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  logInForm: FormGroup;
  usuario: User = {Correo:'', Pass:'', Nombres:'', Apellidos:''}
  errorMessage: string = '';
  //constructor para inicializar cositas
  constructor(private userService: UserService, private router:Router, private authService: AutenticacionService){
    this.logInForm =  new FormGroup({
      email: new FormControl(""),
      password: new FormControl("")
    })

   }


  ngOnInit(): void{
    
   }
  logIn(){
    const user: User={
      Correo: this.logInForm.value.email,
      Pass: this.logInForm.value.password,
      Nombres: '',
      Apellidos: ''
    }
      this.userService.getUserByNameandPassword(user).subscribe((userLogIn: User) => {
        if(userLogIn!=null){
          this.usuario = userLogIn;
          console.log(this.usuario);
          this.authService.login(userLogIn);
          this.router.navigate(['/dashboard']);
          this.errorMessage = '';
        }
        
        
      });
      if(this.usuario.Correo==''){
        
          this.errorMessage = 'Correo electrónico o contraseña incorrectos.';
          console.log("nel")
       
      }
    }
}
