import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../interfaces/user';
import { UserService } from '../../service/user.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, RouterOutlet, RouterLink, FooterComponent, CommonModule],
  providers:[UserService],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userForm: FormGroup;
  usuario: User = {Correo:'', Pass:'', Nombres:'', Apellidos:''}

  //constructor para inicializar cositas
  constructor(private userService: UserService){
    this.userForm =  new FormGroup({
      birthday: new FormControl("", Validators.required),
      firstName: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      lastName: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(30)])
    })

   }


  ngOnInit(): void{
    this.userForm =  new FormGroup({
      birthday: new FormControl("", Validators.required),
      firstName: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      lastName: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(30)])
    })
   }

  //metodo al que llama el form cuando hace submit y que pueda obtener todos los datos
  registerUser(){
    const user: User={
      Correo: this.userForm.value.email,
      Pass: this.userForm.value.password,
      Nombres: this.userForm.value.firstName,
      Apellidos: this.userForm.value.lastName,
      FechaNac: this.userForm.value.birthday
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

}
