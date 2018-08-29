import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../http/http.service';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.less']
})
export class UserManagementComponent implements OnInit {
  i = 1;
  editCache = {};
  dataSet = [];   // 初始化列表
  dataId: string; // 流程ID
  sortValue = null;
  listOfRole: string; // 用户角色
  listOfRoleList = [];
  currentGroup: String;
  currentName: String;
  currentState = '停用';
  name: string;   // 用户名称
  loading = true;
  isupdate = false;
  generalUser = false;
  admin = false;
  superAdmin = true;
  validateForm: FormGroup;
  isVisibleMiddle = false;
  isVisibleEditMiddle = false;
  isVisibleMsgMiddle = false;
  num: number;
  sortName = null;
  size = 'small'; // 按钮尺寸
  listOfSearchName = [];
  listOfTagOptions: string;   //  用户分组
  listOfOption = [];
  listOfType: string; // 用户状态
  listOfTypelist = [];
  listOforgan: string;
  listOforganList = [];
  searchAddress: string;
  selectedValue = this.currentGroup;
  // 自定义选项开始
  allChecked = false;
  // dataSet: Array<{ name: string; age: number; address: string; checked: boolean }> = [];
  indeterminate = false;
  rightsGroup = [
    { label: '超级管理员', value: 'superAdmin', checked: this.superAdmin },
    { label: '管理员', value: 'admin', checked: this.admin },
    { label: '一般用户', value: 'generalUser', checked: this.generalUser}
  ];

  refreshStatus(): void {
    const allChecked = this.dataSet.every(value => value.checked === true);
    const allUnChecked = this.dataSet.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
  }

  checkAll(value: boolean): void {
    this.dataSet.forEach(data => data.checked = value);
    this.refreshStatus();
  }
  // 自定义选项结束
  startEdit(data): void {
    // this.editCache[key].edit = true;
    this.listOfRole = data.role;
    this.name = data.name;
    this.listOfType = data.state;
    this.listOforgan = data.listOforgan;
    this.listOfTagOptions = data.groupName;
    this.dataId = data.id;
    this.isupdate = true;
  }

  cancelEdit(key: string): void {
    this.editCache[key].edit = false;
  }
  log(value: object[]): void {
    console.log(value);
  }
  saveEdit(key: string): void {
    const index = this.dataSet.findIndex(item => item.key === key);
    this.dataSet[index] = this.editCache[key].data;
    this.editCache[key].edit = false;
  }

  updateEditCache(): void {
    this.dataSet.forEach(item => {
      if (!this.editCache[item.key]) {
        this.editCache[item.key] = {
          edit: false,
          data: item
        };
      }
    });
  }
  constructor(private fb: FormBuilder, private http: HttpService) { }

  ngOnInit(): void {
    this.listOfOption = ['1组', '2组', '3组', '4组'];
    this.listOforganList = ['机构一', '机构二', '机构三', '机构四'];
    this.listOfTypelist = [1, 0];

    this.listOfRoleList = ['超级管理员', '管理员', '一般用户'];
    this.validateForm = this.fb.group({
      name: [null],
      listOfRole: [null],
      group: [null],
      groupName: [null],
      state: [null],
      listOforgan: [null],
    });
    this.initData();
    this.loading = false;
    this.updateEditCache();
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
      this.dataSet = this.dataSet.sort((a, b) =>
        (this.sortValue === 'ascend') ? (a[this.sortName] > b[this.sortName] ? 1 : -1) : (b[this.sortName] > a[this.sortName] ? 1 : -1));
      //    this.updateEditCache();
    } else {
      this.dataSet = this.dataSet;
      //    this.updateEditCache();
    }
    console.log(this.dataSet);
  }
  // 模态框
  showModalMiddle(): void {
    this.isVisibleMiddle = true;
  }
  handleOkMiddle(data): void {
    this.submitForm(data);
    this.isupdate = false;
  }

  handleCancelMiddle(): void {
    console.log('click Cancel');
    this.isVisibleMiddle = false;
    this.isupdate = false;
  }
  showModalEditMiddle(): void {
    this.isVisibleEditMiddle = true;
  }
  handleOkEditMiddle(data): void {
    this.editForm(data);
    this.isupdate = false;
  }

  handleCancelEditMiddle(): void {
    console.log('click Cancel');
    this.isVisibleEditMiddle = false;
    this.isupdate = false;
  }

  showModalMsgMiddle(data): void {
    this.isVisibleMsgMiddle = true;
    this.currentGroup = data.groupName;
    this.currentName = data.userName;
    this.currentState = data.state;
  }
  handleOkMsgMiddle(): void {
    console.log('click ok');
    this.isVisibleMsgMiddle = false;
  }

  handleCancelMsgMiddle(): void {
    console.log('click Cancel');
    this.isVisibleMsgMiddle = false;
  }



  // 添加一行数据
  addRow(): void {
    this.showModalMiddle();
    this.updateEditCache();
  }
  // 删除
  deleteRow(i: string): void {
    this.http.httpmenderdel('/user/delById?id=' + i).subscribe(data => {
      if (data.result === '0000') {
        this.initData();
      }
    });
  }

  finishEdit(key: string): void {
    this.editCache[key].edit = false;
    this.dataSet.find(item => item.key === key).name = this.editCache[key].name;
  }
  // 初始化列表
  initData(): void {
    this.http.httpmender('/user/findList', {}).subscribe(data => {
      if (data.result === '0000') {
        this.dataSet = data.data.data;
      }
    });
  }
  submitForm = (value) => {
    // $event.preventDefault();
    // tslint:disable-next-line:forin
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    // value.id = 'string';
    value = JSON.stringify(value);
    console.log(value);
    if (this.validateForm.invalid) { return; }
    this.http.httpmender('/user/addUser', value).subscribe(data => {
      if (data.result === '0000') {
        this.initData();
      }
    });
    this.isVisibleMiddle = false;
  }
  editForm = (value) => {
    // $event.preventDefault();
    // tslint:disable-next-line:forin
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    // value.state = 0;
    value.id = this.dataId;
    value = JSON.stringify(value);
    console.log(value);
    if (this.validateForm.invalid) { return; }
    this.http.httpmenderput('/user/updateUser', value).subscribe(data => {
      if (data.result === '0000') {
        this.initData();
      }
    });
    this.isVisibleMsgMiddle = false;
  }
}
