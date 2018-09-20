import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../http/http.service';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.less']
})
export class ApplicationComponent implements OnInit {
  dataSet = [];   // 初始化列表
  dataId: string; // 流程ID
  dataList: any; // 流程模板
  loading = true;
  isVisibleMiddle = false;  // 控制弹框显示
  isVisibleEditMiddle = false;  // 控制弹框显示
  sortName = null;
  sortValue = null;
  size = 'small'; // 按钮尺寸
  num: number;  // 序号
  name: string; // 应用系统名称
  useFlag: number; // 应用标识
  baseUrl: string;  // 基础地址
  modelId: string;  // 流程模板
  des: string;  // 应用系统描述
  listOfSearchName = [];
  searchAddress: string;
  validateForm: FormGroup;  // 表单
  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.checkAll(true);
      }
    },
    {
      text: 'Select Odd Row',
      onSelect: () => {
        this.dataSet.forEach((data, index) => data.checked = index % 2 !== 0);
        this.refreshStatus();
      }
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.dataSet.forEach((data, index) => data.checked = index % 2 === 0);
        this.refreshStatus();
      }
    }
  ];
  // 自定义选项开始
  allChecked = false;
  // dataSet: Array<{ name: string; age: number; address: string; checked: boolean }> = [];
  indeterminate = false;

  refreshStatus(): void {
    const allChecked = this.dataSet.every(value => value.checked === true);
    const allUnChecked = this.dataSet.every(value => !value.checked);
    if (this.dataSet.length !== 0) {
      this.allChecked = allChecked;
    }
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
    this.modelId = key.modelId.split('|')[0];
    this.des = key.des;
    this.useFlag = key.useFlag;
    this.baseUrl = key.baseUrl;
    this.dataId = key.id;
    this.showModalEditMiddle(key.id);
  }
  constructor(public router: Router, private fb: FormBuilder, private http: HttpService, private message: NzMessageService) { }
  gorouter(item: any) {
    // 	if(this.tabs.indexOf(item.split('/')[1])==-1){
    // 		this.tabs.push(item.split('/')[1]);
    this.router.navigateByUrl(item);
    // 	}else{
    // 		this.router.navigateByUrl(item);
    // 	}
  }
  // 配置
  gorouterWithParam(data) {
    // let key;
    // for (let i = 0; i < this.dataList.length; i++) {
    //   if (this.dataList[i].id === data.modelId) {
    //     key = this.dataList[i].key;
    //   }
    // }
    // tslint:disable-next-line:max-line-length
    this.router.navigate(['home/applicationManagement'], { queryParams: { 'modelId': data.modelId.split('|')[1], 'description': data.modeldescription, 'id': data.id, 'key': data.modelkey, 'type': 'edit' } });
  }
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      useFlag: [null, [Validators.required]],
      des: [null, [Validators.required]],
      baseUrl: [null, [Validators.required]],
      modelId: [null, [Validators.required]]
    });
    this.initData();
    this.loading = false;
  }
  forSearch(inputValue, selecValue): void {
    let dataSearch = {};
    if (selecValue === '应用系统名字') {
      dataSearch = {
        'name': inputValue,
      };
    } else if (selecValue === '流程模板') {
      dataSearch = {
        'modelId': inputValue,
      };
    } else if (selecValue === '应用系统标识') {
      dataSearch = {
        'useFlag': inputValue,
      };
    }
    this.http.httpmender('/applicationsystem/findList', JSON.stringify(dataSearch)).subscribe(data => {
      if (data.result === '0000') {
        this.dataSet = data.data.data;
      } else {
        this.message.create('error', data.msg);
      }
    }, error => this.message.create('error', error));
  }
  // 排序
  sort(sort: { key: string, value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }
  // 初始化列表
  initData(): void {
    this.http.httpmender('/applicationsystem/findList', {}).subscribe(data => {
      if (data.result === '0000') {
        this.dataSet = data.data.data;
      } else {
        this.message.create('error', data.msg);
      }
    }, error => this.message.create('error', error));
    this.http.httpmender('/activiti/modelList?modType=1', {}).subscribe(data => {
      if (data.result === '0000') {
        this.dataList = data.data.data;
        for (let i = 0; i < this.dataList.length; i++) {
          this.dataList[i].description = JSON.parse(this.dataList[i].metaInfo).description;
          for (let j = 0; j < this.dataSet.length; j++) {
            if (this.dataSet[j].modelId.split('|')[0] === this.dataList[i].id) {
              this.dataSet[j].modelName = this.dataList[i].name;
              this.dataSet[j].modelkey = this.dataList[i].key;
              this.dataSet[j].modeldescription = this.dataList[i].description;
            }
          }
        }
      } else {
        this.message.create('error', data.msg);
      }
    }, error => this.message.create('error', error));
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
    this.http.httpmenderdel('/applicationsystem/delAppliById?id=' + i).subscribe(data => {
      if (data.result === '0000') {
        this.initData();
        this.message.create('success', '删除成功');
      } else {
        this.message.create('error', '删除失败');
      }
    }, error => this.message.create('error', error));
  }
  // 新增
  submitForm = (value) => {
    // $event.preventDefault();
    // tslint:disable-next-line:forin
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    value.state = 0;
    // value.id = 'string';
    // value = JSON.stringify(value);
    if (this.validateForm.invalid) { return; }
    this.http.httpmender('/model/create4', { 'modelModelId': value.modelId }).subscribe(data => {
      if (data.result === '0000') {
        value.modelId += '|' + data.data.match(/=(\S*)&/)[1];
        this.http.httpmender('/applicationsystem/addAppli', JSON.stringify(value)).subscribe(data1 => {
          if (data1.result === '0000') {
            this.initData();
            this.message.create('success', '新增成功');
            this.router.navigate(['home/applicationManagement'], { queryParams: { 'url': data.data, 'type': 'add' } });
          } else {
            this.message.create('error', data1.msg);
          }
        }, error => this.message.create('error', error));
      } else {
        this.message.create('error', data.msg);
      }
    }, error => this.message.create('error', error));
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
    this.http.httpmenderput('/applicationsystem/updateAppli', value).subscribe(data => {
      if (data.result === '0000') {
        this.message.create('success', '编辑成功');
        this.initData();
      } else {
        this.message.create('error', data.msg);
      }
    }, error => this.message.create('error', error));
    this.isVisibleEditMiddle = false;
  }
}
