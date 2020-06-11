import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error = false;
  loginUserData = {
    login: "",
    password:""
  }
  user = new User();
  constructor(private auth: AuthService,
    private route: Router) { }

  ngOnInit() {
  }
  process(){
    this.error = false;
  }
  loginUser() {
    console.log(this.loginUserData);
    this.auth.loginUser(this.loginUserData.login, this.loginUserData.password).subscribe(
      (res) => {
        if(res == true){
          this.auth.loginUserbypassword(this.loginUserData.login, this.loginUserData.password).subscribe(
            data => {
              this.user = data;
              console.log(data);
              sessionStorage.setItem('token', JSON.stringify(this.user));
              this.route.navigate(['/app']);
            }
          ),error=>{
            console.log(error);
          };
          this.route.navigate(['/app']);
        }else{
          console.log(res);
          this.error = true;
        }
      },
      error => console.log(error)
    )
  }
 
  
}
