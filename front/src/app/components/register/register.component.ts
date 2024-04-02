import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../interfaces/user';
import { UserService } from '../../service/user.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, RouterOutlet, RouterLink],
  providers:[UserService],
  templateUrl: './register.component.html',
  styleUrls: ['../bootstrap.css', './register.component.css']
})
export class RegisterComponent {
  userForm: FormGroup;
  usuario: User = {Usuario:'', Correo:'', Pass:''}

  //constructor para inicializar cositas
  constructor(private userService: UserService){
    this.userForm =  new FormGroup({
      birthday: new FormControl(""),
      username: new FormControl(""),
      email: new FormControl(""),
      password: new FormControl("")
    })

   }


  ngOnInit(): void{
    
   }

  //metodo al que llama el form cuando hace submit y que pueda obtener todos los datos
  registerUser(){
    const user: User={
      Usuario: this.userForm.value.username,
      Correo: this.userForm.value.email,
      Pass: this.userForm.value.password
    }
    console.log(user)
    try{
      this.userService.addUser(user).subscribe(
        (response) => {
          console.log('POST request successful:', response);
          // Handle response if needed
        },
        (error) => {
          console.error('Error making POST request:', error);
          // Handle error if needed
        }
      );

    }
    catch(error){
      console.log("no jalo :("+error)
    }
    

  }
  logIn(){
    this.userService.getUser().subscribe((users: User[]) => {
      
      this.usuario = users[0];
      console.log(this.usuario);
    });
  }

}
