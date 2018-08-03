import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.less']
})
export class UserManagementComponent implements OnInit {
  i = 1;
  editCache = {};
  dataSet = [];
  sortValue = null;
  listOfRole: string;
  listOfName: string;
  listOfRoleList = [];
  userName: string;
  loading = true;
  isupdate = false;
  isVisibleMiddle = false;
  sortName = null;
  listOfSearchName = [];
  listOfTagOptions: string;
  listOfOption = [];
  listOfType: string;
  listOfTypelist = [];
  searchAddress: string;
  // 自定义选项开始
  allChecked = false;
  // dataSet: Array<{ name: string; age: number; address: string; checked: boolean }> = [];
  indeterminate = false;

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
    this.listOfRole=data.role;
    this.listOfName=data.name;
    this.isupdate=true;
  }

  cancelEdit(key: string): void {
    this.editCache[key].edit = false;
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
  constructor() { }

  ngOnInit(): void {
    this.listOfOption=["1组","2组","3组","4组"];
    this.listOfTypelist=["启用","禁用"];
    this.listOfRoleList=["超级管理员","管理员","一般用户"];
    for (let i = 0; i < 30; i++) {
      this.dataSet.push({
        key: i.toString(),
        num: i,
        userName: `user. ${i}`,
        role: `超级管理员. ${i}`,
        group: `${i}组`,
        state: '启用',
        checked: false
      });
    }
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
  handleOkMiddle(): void {
    console.log('click ok');
    this.isVisibleMiddle = false;
    this.isupdate = false;
    this.dataSet.push({
      userName:this.userName,
      role:this.listOfRole,
      group:this.listOfTagOptions,
      state:this.listOfType,
    });
  }

  handleCancelMiddle(): void {
    console.log('click Cancel');
    this.isVisibleMiddle = false;
    this.isupdate = false;
  }



  // 添加一行数据
  addRow(): void {
    this.showModalMiddle();
    this.i++;
    this.dataSet = [...this.dataSet, {
      key: `${this.i}`,
      num: this.i,
      name: `user. ${this.i}`,
      role: `超级管理员. ${this.i}`,
      group: `${this.i}组`,
      state: '启用'
    }];
    console.log(this.dataSet);
    this.updateEditCache();
  }
  // 删除
  deleteRow(i: string): void {
    const dataSet = this.dataSet.filter(d => d.key !== i);
    this.dataSet = dataSet;
  }

  finishEdit(key: string): void {
    this.editCache[key].edit = false;
    this.dataSet.find(item => item.key === key).name = this.editCache[key].name;
  }

}
