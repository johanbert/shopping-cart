import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserModel } from '../../models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user:UserModel = new UserModel();
  rememberMe:boolean = false;
  jsonKeyNames:any = {
    localStorageEmail: 'email',
    navigateByUrlLogIn:'/home'
  }
  jsonSwals:any = {
    infoWait:{
      allowOutsideClick:false,
      icon:'info',
      text:'Please wait...'
    },
    errorForm: {
      icon:'error',
      text:'Error en formulario, llene los datos correctamente'
    },
    errorAuth:{
      icon:'error',
      title:'Error al autenticar'      
    }
  }

  constructor( private auth:AuthService,
    private router:Router) { }

  ngOnInit() {
  }

  onSubmit(form:NgForm){
    if (form.invalid) {
      Swal.fire(this.jsonSwals.errorForm);
      return;
    }
    
    Swal.fire(this.jsonSwals.infoWait);
    
    Swal.showLoading();
    this.auth.newUser(this.user)
      .subscribe(res =>{
        console.log(res);
        Swal.close();

        if( this.rememberMe ){
          localStorage.setItem(this.jsonKeyNames.localStorageEmail, this.user.email)
        }

        this.router.navigateByUrl(this.jsonKeyNames.navigateByUrlLogIn);
      }, err =>{
        console.log(err.error.error.message);
        this.jsonSwals.errorAuth.text = err.error.error.message
        Swal.fire(this.jsonSwals.errorAuth)
      })
  }


}
