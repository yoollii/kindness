import { Component, OnInit, ViewChild } from '@angular/core';
import { NzFormatEmitEvent, NzTreeNode, NzTreeComponent } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpService } from '../../http/http.service';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.less']
})
export class RoleManagementComponent implements OnInit {
  @ViewChild('nzTree') nzTree: NzTreeComponent;
  dataSet = [];   // 初始化列表
  dataId: string; // 流程ID
  validateForm: FormGroup;  // 表单
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
  num: number;  // 序号
  name: string; // 角色名称
  role: string; // 角色权限
  des: string;  // 角色描述
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
  startEdit(key: any): void {
    this.name = key.name;
    this.des = key.des;
    this.dataId = key.id;
    this.showModalEditMiddle();
  }
  constructor(private fb: FormBuilder, private http: HttpService, private message: NzMessageService) {}
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required] ],
      des: [null, [Validators.required] ],
      organnodes: [null],
    });
    this.initData();
    this.loading = false;
  }
  // 排序
  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
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
  }

  handleCancelMiddle(): void {
    console.log('click Cancel');
    this.isVisibleMiddle = false;
  }
  showModalEditMiddle(): void {
    this.isVisibleEditMiddle = true;
  }
  handleOkEditMiddle(data): void {
    this.editForm(data);
  }

  handleCancelEditMiddle(): void {
    console.log('click Cancel');
    this.isVisibleEditMiddle = false;
  }
  showModalMsgMiddle(data): void {
    this.isVisibleMsgMiddle = true;
    this.currentDescribe = data.des;
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
    this.validateForm.reset();
  }
  // 删除
  deleteRow(i: string): void {
    this.http.httpmenderdel('/role/delRoleById?id=' + i).subscribe(data => {
      if (data.result === '0000') {
        this.initData();
        this.message.create('success', '删除成功');
      } else {
        this.message.create('error', '删除失败');
      }
    });
  }
  // 初始化列表
  initData(): void {
    this.http.httpmender('/role/findList', {}).subscribe(data => {
      if (data.result === '0000') {
        this.dataSet = data.data.data;
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
    value.organnodes = value.organnodes.key;
    value = JSON.stringify(value);
    if (this.validateForm.invalid) { return; }
    this.http.httpmender('/role/addRole', value).subscribe(data => {
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
    value.organnodes = value.organnodes.key;
    value = JSON.stringify(value);
    console.log(value);
    if (this.validateForm.invalid) { return; }
    this.http.httpmenderput('/role/updateRole', value).subscribe(data => {
      if (data.result === '0000') {
        this.initData();
        this.message.create('success', '编辑成功');
      } else {
        this.message.create('error', '编辑失败');
      }
    });
    this.isVisibleEditMiddle = false;
  }
}
