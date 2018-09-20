import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { HttpService } from '../http/http.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
// import { LocalStorageService } from 'angular-web-storage';
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
  public router: Router,
  public msg: NzMessageService,
  private modalSrv: NzModalService,
  private http: HttpService,
  ) {
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
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    // if (this.userName.invalid || this.password.invalid) { return; }

    this.loading = true;
  setTimeout(() => {
    this.loading = false;
    this.http.httpmenderlogin('/user/userLogin', { 'name': this.userName.value, 'password': this.password.value })
      .subscribe(data => {
        if (data.result === '0000') {
          this.router.navigate(['home'], { queryParams: { 'name': data.data.user.name} });
          // this.local.set('role', data.data.role);
          // this.local.set('powers', data.data.powers);
          // this.local.set('user', data.data.user);
        } else {
          this.error = data.msg;
        }
      });
  }, 1000);
  }
}
