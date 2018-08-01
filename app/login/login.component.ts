import { Component, OnInit } from '@angular/core';
import {AbstractControl,FormBuilder,FormGroup,Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
validateForm: FormGroup;
error = '';
loading = false;
constructor(
	  private fb: FormBuilder,
	  public router:Router,
	  public msg: NzMessageService,
    private modalSrv: NzModalService) {
}

ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [ null, [ Validators.required, Validators.minLength(5) ] ],
      password: [ null, [ Validators.required ] ],
      remember: [ true ]
    });
    
}

get userName() {
    return this.validateForm.controls.userName;
}
get password() {
    return this.validateForm.controls.password;
  }
submitForm(): void {
	  this.error = '';
    for (const i in this.validateForm.controls) {
    	this.validateForm.controls[ i ].markAsDirty();
    	this.validateForm.controls[ i ].updateValueAndValidity();
    }
    if (this.userName.invalid || this.password.invalid) return;
    
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
        if (
          this.userName.value !== 'admin' ||
          this.password.value !== '123456'
        ) {
          this.error = `账户或密码错误`;
          return;
        }
      this.router.navigateByUrl("home");
    }, 1000);
}


}
