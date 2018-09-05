import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../http/http.service';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.less']
})
export class ServiceComponent implements OnInit {

  dataSet = [];   // 初始化列表
  dataId: string; // 流程ID
  loading = true;
  listOfTypelist = [];
  listOfType: string; // 状态
  isVisibleMiddle = false;  // 控制弹框显示
  isVisibleEditMiddle = false;  // 控制弹框显示
  sortName = null;
  sortValue = null;
  size = 'small'; // 按钮尺寸
  num: number;  // 序号
  name: string; // 服务名称
  state: number; // 状态
  urlFlag: string;  // 路径标识
  url: string;  // 路径地址
  des: string;  // 服务描述
  searchAddress: string;
  validateForm: FormGroup;  // 表单
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
  startEdit(key: any): void {
    // this.editCache[key].edit = true;
    this.name = key.name;
    this.state = key.state;
    this.des = key.des;
    this.urlFlag = key.urlFlag;
    this.url = key.url;
    this.dataId = key.id;
    this.showModalEditMiddle(key.id);
  }
  constructor(private fb: FormBuilder, private http: HttpService, private message: NzMessageService) { }
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      state: [null, [Validators.required]],
      des: [null, [Validators.required]],
      urlFlag: [null, [Validators.required]],
      url: [null, [Validators.required]]
    });
    this.listOfTypelist = [1, 0];
    this.initData();
    this.loading = false;
  }
  forSearch(inputValue, selecValue): void {
    let dataSearch = {};
    if (selecValue === '服务名称') {
      dataSearch = {
        'name': inputValue,
      };
    } else if (selecValue === '状态') {
      dataSearch = {
        'state': inputValue,
      };
    } else if (selecValue === '路径标识') {
      dataSearch = {
        'urlFlag': inputValue,
      };
    }
    // } else if (selecValue === '应用系统描述') {
    //   dataSearch = {
    //     'des': inputValue,
    //   };
    // }
    this.http.httpmender('/ser/findList', JSON.stringify(dataSearch)).subscribe(data => {
      if (data.result === '0000') {
        this.dataSet = data.data.data;
      }
    });
    for (let i = 0; i < this.dataSet.length; i++) {
      this.dataSet[i].checked = false;
    }
  }
  // 排序
  sort(sort: { key: string, value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }
  // 初始化列表
  initData(): void {
    this.http.httpmender('/ser/findList', {}).subscribe(data => {
      if (data.result === '0000') {
        this.dataSet = data.data.data;
      }
    });
  }
  search(): void {
    if (this.sortName) {
      this.dataSet = this.dataSet.sort((a, b) =>
        (this.sortValue === 'ascend') ? (a[this.sortName] > b[this.sortName] ? 1 : -1) : (b[this.sortName] > a[this.sortName] ? 1 : -1));
    } else {
      this.dataSet = this.dataSet;
    }
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
  showModalEditMiddle(id): void {
    this.isVisibleEditMiddle = true;
  }
  handleOkEditkMiddle(data): void {
    this.editForm(data);
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
  // 删除
  deleteRow(i: any): void {
    this.http.httpmenderdel('/ser/delById?id=' + i).subscribe(data => {
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
    // value.id = 'string';
    value = JSON.stringify(value);
    if (this.validateForm.invalid) { return; }
    this.http.httpmender('/ser/addSer', value).subscribe(data => {
      if (data.result === '0000') {
        this.initData();
        this.message.create('success', '新增成功');
      } else {
        this.message.create('error', '新增失败');
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
    // value.state = 0;
    value.id = this.dataId;
    value = JSON.stringify(value);
    if (this.validateForm.invalid) { return; }
    this.http.httpmenderput('/ser/updateSer', value).subscribe(data => {
      if (data.result === '0000') {
        this.message.create('success', '编辑成功');
      } else {
        this.message.create('error', '编辑失败');
      }
    });
    this.isVisibleEditMiddle = false;
  }
}
