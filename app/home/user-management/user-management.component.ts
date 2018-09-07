import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { HttpService } from '../../http/http.service';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.less']
})
export class UserManagementComponent implements OnInit {
  dataSet = [];   // 初始化列表
  dataId: string; // 流程ID
  sortValue = null;
  rid: string; // 用户角色id
  listOfRoleList = [];  // 角色下拉列表
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
  isVisibleMsgMiddle = false;
  num: number;
  sortName = null;
  size = 'small'; // 按钮尺寸
  listOfSearchName = [];
  listOfTagOptions: string;   //  用户分组
  listOfOption = [];
  listOfType: string; // 用户状态
  listOfTypelist = [];
  institutionsId: string;  // 机构id
  listOforganList = [];  // 机构列表
  listOforganUserList = [];  // 用户机构关机列表
  searchAddress: string;
  selectedValue = this.currentGroup;
  // 自定义选项开始
  allChecked = false;
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
    this.rid = data.rid;
    this.name = data.name;
    this.listOfType = data.state;
    this.institutionsId = data.organ;
    this.listOfTagOptions = data.groupName;
    this.dataId = data.id;
    this.isupdate = true;
  }
  constructor(private fb: FormBuilder, private http: HttpService, private message: NzMessageService) { }

  ngOnInit(): void {
    this.listOfOption = ['1组', '2组', '3组', '4组'];
    this.listOfTypelist = [1, 0];
   // this.findRoleList();
    this.validateForm = this.fb.group({
      name: [null, [Validators.required] ],
      rid: [null, [Validators.required]],
      group: [null],
      groupName: [null],
      state: [null, [Validators.required]],
      institutionsId: [null],
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
  search(): void {
    if (this.sortName) {
      this.dataSet = this.dataSet.sort((a, b) =>
        (this.sortValue === 'ascend') ? (a[this.sortName] > b[this.sortName] ? 1 : -1) : (b[this.sortName] > a[this.sortName] ? 1 : -1));
    } else {
      this.dataSet = this.dataSet;
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
    this.isupdate = true;
  }
  handleOkEditMiddle(data): void {
    this.editForm(data);
  }

  handleCancelEditMiddle(): void {
    console.log('click Cancel');
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

  log(data): void {
    console.log(data);
  }

  // 添加一行数据
  addRow(): void {
    this.showModalMiddle();
    this.validateForm.reset();
  }
  // 删除
  deleteRow(i: string): void {
    this.http.httpmenderdel('/user/delById?id=' + i).subscribe(data => {
      if (data.result === '0000') {
        this.initData();
        this.message.create('success', '删除成功');
      } else {
        this.message.create('error', '删除失败');
      }
    });
  }

  // 角色列表
  findRoleList(): void {
    this.http.httpmender('/role/findList', {}).subscribe(data => {
      if (data.result === '0000') {
        this.listOfRoleList = data.data.data;
        for (const i in this.dataSet) {
          // tslint:disable-next-line:forin
          for (const j in this.listOfRoleList) {
            if (this.dataSet[i].rid === this.listOfRoleList[j].id) {
              this.dataSet[i].rname = this.listOfRoleList[j].name;
            }
          }
        }
      }
    });
  }
  findOrgn(): void {
    this.http.httpmender('/userInstitu/findList', {}).subscribe(data => {
      if (data.result === '0000') {
        this.listOforganUserList = data.data.data;
        for (let i = 0; i < this.listOforganUserList.length; i++) {
          for (let j = 0; j < this.dataSet.length; j++) {
            if (this.dataSet[j].id === this.listOforganUserList[i].uid) {
              this.dataSet[j].organ = this.listOforganUserList[i].iid;
              for (let m = 0; m < this.listOforganList.length; m++) {
                if (this.dataSet[j].organ === this.listOforganList[m].id) {
                  this.dataSet[j].organName = this.listOforganList[m].name;
                }
              }
            }
          }
        }
      }
    });
  }
  findOrgnList(): void {
    this.http.httpmender('/institu/findList', {}).subscribe(data => {
      if (data.result === '0000') {
        this.listOforganList = data.data.data;
        this.findOrgn();
      }
    });
  }
  // 初始化列表
  initData(): void {
    this.http.httpmender('/user/findList', {}).subscribe(data => {
      if (data.result === '0000') {
        this.dataSet = data.data.data;
        this.findRoleList();
        this.findOrgnList();
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
    // value.id = 'string';
    value = JSON.stringify(value);
    console.log(value);
    if (this.validateForm.invalid) { return; }
    this.http.httpmender('/user/addUser', value).subscribe(data => {
      if (data.result === '0000') {
        this.initData();
        this.message.create('success', '新增成功');
      } else {
        this.message.create('error', '新增失败');
      }
    });
    this.isVisibleMiddle = false;
  }
  // 编辑
  editForm = (value) => {
    // $event.preventDefault();
    // tslint:disable-next-line:forin
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    value.id = this.dataId;
    value = JSON.stringify(value);
    if (this.validateForm.invalid) { return; }
    this.http.httpmenderput('/user/updateUser', value).subscribe(data => {
      if (data.result === '0000') {
        this.initData();
        this.message.create('success', '编辑成功');
      } else {
        this.message.create('error', '编辑失败');
      }
    });
    this.isupdate = false;
  }
}
