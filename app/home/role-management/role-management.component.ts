import { Component, OnInit, ViewChild } from '@angular/core';
import { NzFormatEmitEvent, NzTreeNode, NzTreeComponent } from 'ng-zorro-antd';
@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.less']
})
export class RoleManagementComponent implements OnInit {
  @ViewChild('nzTree') nzTree: NzTreeComponent;
  i = 1;
  editCache = {};
  dataSet = [];
  loading = true;
  isVisibleMiddle = false;
  isVisibleEditMiddle = false;
  isVisibleMsgMiddle = false;
  sortName = null;
  sortValue = null;
  currentName: string;
  currentDescribe: string;
  listOfSearchName = [];
  size = 'small'; // 按钮尺寸
  num: number;
  name: string;
  role: string;
  group: string;
  searchAddress: string;
  // 自定义选项开始
  allChecked = false;
  // dataSet: Array<{ name: string; age: number; address: string; checked: boolean }> = [];
  indeterminate = false;
  expandKeys = ['1001', '10001'];
  checkedKeys = ['100011', '1002'];
  selectedKeys = ['10001', '100011'];
  expandDefault = false;
  nodes = [
    new NzTreeNode({
      title: '超级管理员',
      key: '1001',
      children: [
        {
          title: '管理员1',
          key: '10001',
          children: [
            {
              title: '用户1',
              key: '100011',
              isLeaf: true
            },
            {
              title: '用户2',
              key: '100012',
              isLeaf: true
            }
          ]
        },
        {
          title: '管理员2',
          key: '10002',
          children: [
            {
              title: '用户3',
              key: '1000121',
              isLeaf: true,
              disabled: true
            },
            {
              title: '用户4',
              key: '1000122',
              isLeaf: true
            }
          ]
        }
      ]
    })
  ];
  organexpandKeys = ['1001', '10001'];
  organcheckedKeys = ['10001'];
  organselectedKeys = ['10001', '100011'];
  organexpandDefault = false;
  organnodes = [
    new NzTreeNode({
      title: '角色权限',
      key: '1001',
      children: [
        {
          title: '超级管理员',
          key: '10001',
        },
        {
          title: '管理员',
          key: '10002',
        },
        {
          title: '一般用户',
          key: '10003',
        },
      ]
    })
  ];

  organmouseAction(name: string, event: NzFormatEmitEvent): void {
    console.log(name, event);
    // just for demo, should get in ngAfterViewInit
    console.log('checkedNodes: %o', this.nzTree.getCheckedNodeList());
    console.log('selectedNodes: %o', this.nzTree.getSelectedNodeList());
    console.log('halfCheckedNodes: %o', this.nzTree.getHalfCheckedNodeList());
    console.log(this.nzTree.nzTreeService.getCheckedNodeList());
  }

  refreshStatus(): void {
    const allChecked = this.dataSet.every(value => value.checked === true);
    const allUnChecked = this.dataSet.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = !allChecked && !allUnChecked;
  }
  mouseAction(name: string, event: NzFormatEmitEvent): void {
    console.log(name, event);
  }
  checkAll(value: boolean): void {
    this.dataSet.forEach(data => (data.checked = value));
    this.refreshStatus();
  }
  // 自定义选项结束
  startEdit(key: string): void {
    // this.editCache[key].edit = true;
    this.showModalEditMiddle();
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
  constructor() {}

  ngOnInit(): void {
    for (let i = 1; i < 30; i++) {
      this.dataSet.push({
        key: i.toString(),
        num: i,
        name: '超级管理员',
        role: '',
        group: '系统级用户角色',
        checked: false
      });
    }
    this.loading = false;
    this.updateEditCache();
  }
  // 排序
  sort(sort: { key: string; value: string }): void {
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
      this.dataSet = this.dataSet.sort(
        (a, b) =>
          this.sortValue === 'ascend'
            ? a[this.sortName] > b[this.sortName]
              ? 1
              : -1
            : b[this.sortName] > a[this.sortName]
              ? 1
              : -1
      );
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
  showModalEditMiddle(): void {
    this.isVisibleEditMiddle = true;
  }
  handleOkEditMiddle(): void {
    console.log('click ok');
    this.isVisibleEditMiddle = false;
  }

  handleCancelEditMiddle(): void {
    console.log('click Cancel');
    this.isVisibleEditMiddle = false;
  }
  showModalMsgMiddle(data): void {
    this.isVisibleMsgMiddle = true;
    this.currentDescribe = data.group;
    this.currentName = data.name;
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
    this.i++;
    this.dataSet = [
      ...this.dataSet,
      {
        key: `${this.i}`,
        num: this.i,
        name: '超级管理员',
        role: '',
        group: '系统级用户角色',
      }
    ];
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
