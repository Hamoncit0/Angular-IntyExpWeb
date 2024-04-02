import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../interfaces/user';
import { UserService } from '../../service/user.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, RouterOutlet, RouterLink],
  providers:[UserService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../bootstrap.css']
})
export class LoginComponent {

  logInForm: FormGroup;
  usuario: User = {Usuario:'', Correo:'', Pass:''}

  //constructor para inicializar cositas
  constructor(private userService: UserService, private router:Router){
    this.logInForm =  new FormGroup({
      username: new FormControl(""),
      password: new FormControl("")
    })

   }


  ngOnInit(): void{
    
   }
  logIn(){
    const user: User={
      Usuario: this.logInForm.value.username,
      Correo: this.logInForm.value.email,
      Pass: this.logInForm.value.password
    }
      this.userService.getUserByNameandPassword(user).subscribe((userLogIn: User) => {
        if(userLogIn!=null){
          this.usuario = userLogIn;
          console.log(this.usuario);
          this.router.navigate(['/dashboard']);
        }
        
        
      });
    }
}
