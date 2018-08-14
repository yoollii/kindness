import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organmanagement',
  templateUrl: './organmanagement.component.html',
  styleUrls: ['./organmanagement.component.less']
})
export class OrganmanagementComponent implements OnInit {
  dataSet = [];
  i = 1;
  editCache = {};
  loading = true;
  isVisibleMiddle = false;
  name: string;
  num: string;
  tel: string;
  sortName = null;
  sortValue = null;
  listOfSearchName = [];
  size = 'small'; // 按钮尺寸
  searchAddress: string;
  // 自定义选项开始
  // dataSet: Array<{ name: string; age: number; address: string; checked: boolean }> = [];
  indeterminate = false;
  constructor() { }
  refreshStatus(): void {
    const allChecked = this.dataSet.every(value => value.checked === true);
    const allUnChecked = this.dataSet.every(value => !value.checked);
    this.indeterminate = (!allChecked) && (!allUnChecked);
  }

  // 自定义选项结束
  startEdit(key: string): void {
    // this.editCache[key].edit = true;
    this.showModalMiddle();
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
  ngOnInit(): void {
    for (let i = 0; i < 5; i++) {
      this.dataSet.push({
        key: i.toString(),
        name: `机构 ${i}`,
        num: 32,
        tel: `028-235646${i}`,
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
      // tslint:disable-next-line:max-line-length
      this.dataSet = this.dataSet.sort((a, b) => (this.sortValue === 'ascend') ? (a[this.sortName] > b[this.sortName] ? 1 : -1) : (b[this.sortName] > a[this.sortName] ? 1 : -1));
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
  }

  handleCancelMiddle(): void {
    console.log('click Cancel');
    this.isVisibleMiddle = false;
  }

  // 添加一行数据
  addRow(): void {
    this.showModalMiddle();
    this.i++;
    this.dataSet = [...this.dataSet, {
      key: `${this.i}`,
      name: `机构${this.i}`,
      num: '32',
      tel: `028-236597 ${this.i}`
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
