import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../http/http.service';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-organmanagement',
  templateUrl: './organmanagement.component.html',
  styleUrls: ['./organmanagement.component.less']
})
export class OrganmanagementComponent implements OnInit {
  dataSet = [];
  dataId: string;
  loading = true;
  isVisibleMiddle = false;
  isVisibleEditMiddle = false;
  name: string;
  code: string;
  tel: string;
  num: number;
  sortName = null;
  sortValue = null;
  listOfSearchName = [];
  validateForm: FormGroup;  // 表单
  size = 'small'; // 按钮尺寸
  searchAddress: string;
  // 自定义选项开始
  // dataSet: Array<{ name: string; age: number; address: string; checked: boolean }> = [];
  indeterminate = false;
  constructor(private fb: FormBuilder, private http: HttpService, private message: NzMessageService) { }
  refreshStatus(): void {
    const allChecked = this.dataSet.every(value => value.checked === true);
    const allUnChecked = this.dataSet.every(value => !value.checked);
    this.indeterminate = (!allChecked) && (!allUnChecked);
  }

  // 自定义选项结束
  startEdit(key: any): void {
    // this.editCache[key].edit = true;
    this.showModalEditMiddle();
    this.name = key.name;
    // this.modelId = key.modelId;
    this.code = key.code;
    this.tel = key.tel;
    this.dataId = key.id;
  }
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      tel: [null, [Validators.required]],
    });
    this.initData();
    this.loading = false;
  }
  // 排序
  sort(sort: { key: string, value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  filter(listOfSearchName: string[], searchAddress: string): void {
    this.listOfSearchName = listOfSearchName;
    this.searchAddress = searchAddress;
    this.search();
  }

  search(): void {
    if (this.sortName) {
      // tslint:disable-next-line:max-line-length
      this.dataSet = this.dataSet.sort((a, b) => (this.sortValue === 'ascend') ? (a[this.sortName] > b[this.sortName] ? 1 : -1) : (b[this.sortName] > a[this.sortName] ? 1 : -1));
      //    this.updateEditCache();
    } else {
      this.dataSet = this.dataSet;
      //    this.updateEditCache();
    }
  }

  // 模态框
  showModalMiddle(): void {
    this.isVisibleMiddle = true;
  }
  handleOkMiddle(data): void {
    console.log('click ok');
    this.submitForm(data);
  }

  handleCancelMiddle(): void {
    console.log('click Cancel');
    this.isVisibleMiddle = false;
  }
  showModalEditMiddle(): void {
    this.isVisibleEditMiddle = true;
  }
  handleOkEditMiddle(data): void {
    console.log('click ok');
    this.editForm(data);
    this.isVisibleEditMiddle = false;
  }

  handleCancelEditMiddle(): void {
    console.log('click Cancel');
    this.isVisibleEditMiddle = false;
  }
  // 添加一行数据
  addRow(): void {
    this.showModalMiddle();
    this.validateForm.reset();
  }
  // 初始化列表
  initData(): void {
    this.http.httpmender('/institu/findList', {}).subscribe(data => {
      if (data.result === '0000') {
        this.dataSet = data.data.data;
        for (let j = 0; j < this.dataSet.length; j++) {
          this.dataSet[j].num = j;
        }
      }
    });
  }
  // 删除
  deleteRow(i: string): void {
    this.http.httpmenderdel('/institu/delById?id=' + i).subscribe(data => {
      if (data.result === '0000') {
        this.initData();
        this.message.create('success', '删除成功');
      } else {
        this.message.create('error', '删除失败');
      }
    });
  }
  // 新增
  submitForm = (value) => {
    // $event.preventDefault();
    // tslint:disable-next-line:forin
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    value.order = 0;
    value.des = 'test';
    // value.id = 'string';
    value = JSON.stringify(value);
    if (this.validateForm.invalid) { return; }
    this.http.httpmender('/institu/addInstitution', value).subscribe(data => {
      if (data.result === '0000') {
        this.initData();
        this.message.create('success', '新增成功');
      } else {
        this.message.create('error', data.msg);
      }
    });
    this.isVisibleMiddle = false;
    // this.gorouter('home/applicationManagement');
  }
  // 编辑
  editForm = (value) => {
    // $event.preventDefault();
    // tslint:disable-next-line:forin
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    value.order = 0;
    value.des = 'test';
    value.id = this.dataId;
    value = JSON.stringify(value);
    if (this.validateForm.invalid) { return; }
    this.http.httpmenderput('/institu/updateInstitutions', value).subscribe(data => {
      if (data.result === '0000') {
        this.message.create('success', '编辑成功');
        this.initData();
      } else {
        this.message.create('error', data.msg);
      }
    });
    this.isVisibleEditMiddle = false;
  }
}
