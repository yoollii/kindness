import { Component, OnInit, enableProdMode } from '@angular/core';
enableProdMode();
import { Router } from '@angular/router';
import * as jsp from 'jsplumb';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../http/http.service';
import { ValidatorService } from '../../validator.service';
import { NzMessageService } from 'ng-zorro-antd';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-process-management',
  templateUrl: './process-management.component.html',
  styleUrls: ['./process-management.component.less']
})
export class ProcessManagementComponent implements OnInit {
  dataId: string; // 流程ID
  dataSet = []; // 初始化列表
  jsplmdIs = false;
  imgSrc: SafeResourceUrl;
  key: string;  // 关键字
  loading = true;
  isVisibleMiddle = false;
  isVisibleViewMiddle = false;
  isVisibleMiddle1 = false;
  isVisibleEditMiddle = false;
  sortName = null;
  sortValue = null;
  num: number;  // 序号
  size = 'small'; // 按钮尺寸
  name: string; // 流程模板名称
  state: string;  // 部署状态
  listOfType: string; // 用户状态
  listOfTypelist = [];
  cruser: string; // 创建人
  description: string;  // 流程模板描述
  validateForm: FormGroup; // 新增表单
  editdateForm: FormGroup;  // 编辑表单
  listOfSearchName = [];
  searchAddress: string;
  panels = [
    {
      active    : true,
      name      : '当前模版预览',
      disabled  : false,
      customStyle: {
        'background'   : '#f7f7f7',
        'border-radius': '4px',
        'margin-bottom': '24px',
      }
    }

  ];
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
        this.refreshStatus(event);
      }
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.dataSet.forEach((data, index) => data.checked = index % 2 === 0);
        this.refreshStatus(event);
      }
    }
  ];
  // 自定义选项开始
  allChecked = false;
  // dataSet: Array<{ name: string; age: number; address: string; checked: boolean }> = [];
  indeterminate = false;
  gorouter(item: any) {
    // 	if(this.tabs.indexOf(item.split('/')[1])==-1){
    // 		this.tabs.push(item.split('/')[1]);
    this.router.navigateByUrl(item);
    // 	}else{
    // 		this.router.navigateByUrl(item);
    // 	}
  }
  gorouterWithParam(item) {
    // tslint:disable-next-line:max-line-length
    this.router.navigate(['home/processManagementList'], { queryParams: { 'url': item, 'type': 'add'}});
  }
  gorouterEditParam(item) {
    // tslint:disable-next-line:max-line-length
    this.router.navigate(['home/processManagementList'], { queryParams: { 'modelId': item.id, 'key': item.key, 'type': 'edit' } });
  }
  refreshStatus(event): void {
    this.jsplmdIs = event;
    const allChecked = this.dataSet.every(value => value.checked === true);
    const allUnChecked = this.dataSet.every(value => !value.checked);
    if (this.dataSet.length !== 0) {
      this.allChecked = allChecked;
    }
    this.indeterminate = (!allChecked) && (!allUnChecked);
  }

  checkAll(value: boolean): void {
    this.dataSet.forEach(data => data.checked = value);
    this.refreshStatus(event);
  }
  // 自定义选项结束
  startEdit(key: any): void {
    // this.name = key.name;
    // this.key = key.key;
    // this.description = key.description;
    // this.dataId = key.id;
    // this.showModalEditMiddle();
    this.gorouterEditParam(key);
  }
  constructor(public router: Router, private fb: FormBuilder, private message: NzMessageService,
    private http: HttpService, private Validator: ValidatorService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      // state: [null, [Validators.required, this.Validator.positiveNumberValidator]],
      description: [null, [Validators.required]],
      key: [null, [Validators.required]],
    });
    this.listOfTypelist = [1, 0];
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
  }
  handleOkMiddle1(): void {
    this.isVisibleMiddle1 = false;
  }
  handleCancelMiddle(): void {
    console.log('click Cancel');
    this.isVisibleMiddle = false;
    this.isVisibleMiddle1 = false;
  }
  showModalViewMiddle(): void {
    this.isVisibleViewMiddle = true;
  }
  handleOkViewMiddle(): void {
    this.isVisibleViewMiddle = false;
  }
  handleCancelViewMiddle(): void {
    this.isVisibleViewMiddle = false;
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
  // 添加一行数据
  addRow(): void {
    this.showModalMiddle();
    this.validateForm.reset();
  }
  // 预览流程图
  abdeRow(id) {
    this.imgSrc = this.sanitizer.bypassSecurityTrustResourceUrl('http://hjj.ngrok.michaelch.xyz/model/resource/readModel?modelId=' + id);
    // this.isVisibleMiddle1 = true;
    this.showModalViewMiddle();
  }
  // 删除
  deleteRow(i: string): void {
    this.http.httpmenderdel('/model/delModel/' + i).subscribe(data => {
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
    this.http.httpmender('/activiti/modelList?modType=1', {}).subscribe(data => {
      if (data.result === '0000') {
        this.dataSet = data.data.data;
        for (let i = 0; i < this.dataSet.length; i++) {
          this.dataSet[i].checked = false;
          this.dataSet[i].description = JSON.parse(this.dataSet[i].metaInfo).description;
        }
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
    // value.orders = 0;
    // value.id = 'string';
    if (this.validateForm.invalid) { return; }
    // tslint:disable-next-line:max-line-length
    // this.http.httpmenderget('/model/create2?name=' + value.name + '&key=' + value.key + '&description=' + value.description).subscribe(data => {
     this.http.httpmender('/model/create2', JSON.stringify(value)).subscribe(data => {
      if (data.result === '0000') {
        this.gorouterWithParam(data.data);
        this.initData();
        this.message.create('success', '新增成功');
      } else {
        this.message.create('error', '新增失败');
      }
    });
    this.isVisibleMiddle = false;
    this.isVisibleMiddle1 = false;
    // this.gorouter('home/processManagementList');
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
    this.http.httpmenderput('/model/editModel', value).subscribe(data => {
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
