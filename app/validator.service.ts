import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }
  positiveNumberValidator(control: FormControl): any {
    if (!control.value) { // 如果输入为空则返回空
      return null;
    }
    const val = control.value;
    const num = /^[0-1]*$/;
    const result = num.test(val);
    if (result) {
      return null;
    } else {
      return { positiveNumber: true };  // 如果输入为不为0或1，显示错误信息
    }
  }
}
