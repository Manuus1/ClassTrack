import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/users/users.service';
import { FormGroup,FormBuilder,Validators,ReactiveFormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-crear-user',
  templateUrl: './crear-user.page.html',
  styleUrls: ['./crear-user.page.scss'],
  providers: [UserService]
})
export class CrearUserPage implements OnInit {

  FormularioAlumno: FormGroup;

  constructor(private userService: UserService,
     private fb :FormBuilder) {

    this.FormularioAlumno = this.fb.group({
      rut: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      curso: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      apmaterno: ['', Validators.required],
      tipo_user: ['', Validators.required],
   });
  }
  ngOnInit() {

  }
  async agregarUsuario() {
    if (!this.FormularioAlumno){
      console.error('Error this.formulario no definido...')
        return;
        }
        const formDataAlumno = this.FormularioAlumno.value;
    this.userService.addUser(formDataAlumno).subscribe(
      (result = this.agregarUsuario) => {
        console.log('Se guardo con exito:', result);
    },
    (error) => {
      console.error('Error al guardar el alumno: ',error);
    }
    );
  }
}
  

