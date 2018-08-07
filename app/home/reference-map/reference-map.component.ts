import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadFile } from 'ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-reference-map',
  templateUrl: './reference-map.component.html',
  styleUrls: ['./reference-map.component.less']
})
export class ReferenceMapComponent implements OnInit {
  validateForm: FormGroup;
  fileList = [];
  handleChange(info: any): void {
    const fileList = info.fileList;
    // 2. read from response and show file link
    if (info.file.response) {
      info.file.url = info.file.response.url;
    }
    // 3. filter successfully uploaded files according to response from server
    this.fileList = fileList.filter(item => {
      if (item.response) {
        return item.response.status === 'success';
      }
      return true;
    });
  }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm.valid);
    if (this.validateForm.valid) {
      this.nzMessageService.info('导入成功');
    }

  }
  constructor(private fb: FormBuilder, private nzMessageService: NzMessageService) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
      gender: [null, [Validators.required]],
      province: [null, [Validators.required]],
      city: [null, [Validators.required]],
      comment: ['', [Validators.required]]
    });
  }
}
