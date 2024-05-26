import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../interfaces/user';
import { UserService } from '../../service/user.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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
  mensajeChi: String = "";
  hidePassword = true;

  //constructor para inicializar cositas
  constructor(private userService: UserService, private router:Router){
    this.userForm =  new FormGroup({
      birthday: new FormControl("", Validators.required),
      firstName: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      lastName: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(30), Validators.pattern(/[A-Z]/), Validators.pattern(/\d/),  Validators.pattern(/[!@#$%^&*(),.?":{}|<>]/)])
    })

   }


  ngOnInit(): void{
    this.userForm =  new FormGroup({
      birthday: new FormControl("", Validators.required),
      firstName: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      lastName: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(30), Validators.pattern(/[A-Z]/), Validators.pattern(/\d/),  Validators.pattern(/[!@#$%^&*(),.?":{}|<>]/)])
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
          this.mensajeChi = "Registro completado correctamente."
          this.userForm.reset(); //borrar datos del form
        },
        (error) => {
          console.error('Error making POST request:', error);
        }
      );

    }
    catch(error){
      console.log("no jalo :("+error)
    }
    

  }
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  get password() {
    return this.userForm.get('password');
  }

  getFirstPasswordError() {
    const errors = this.password?.errors;
    if (!errors) {
      return null;
    }

    if (errors['required']) {
      return 'Ingrese una contraseña.';
    }
    if (errors['minlength']) {
      return 'Ingrese una contraseña con mínimo 6 caracteres.';
    }
    if (errors['maxlength']) {
      return 'Ingrese una contraseña con máximo 30 caracteres.';
    }
    if (!/[A-Z]/.test(this.password?.value)) {
      return 'Ingrese una contraseña con mínimo una mayúscula.';
    }
    if (!/\d/.test(this.password?.value)) {
      return 'Ingrese una contraseña con mínimo un número.';
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(this.password?.value)) {
      return 'Ingrese una contraseña con mínimo un caracter especial.';
    }

    return null;
  }

}
