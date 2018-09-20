import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NzMessageService } from 'ng-zorro-antd';
import * as jsp from 'jsplumb';
import * as $ from 'jquery';
import { HttpService } from '../../../http/http.service';

export interface TreeNodeInterface {
  key: number;
  name: string;
  age: number;
  level: number;
  expand: boolean;
  address: string;
  children?: TreeNodeInterface[];
}
@Component({
  selector: 'app-application-management',
  templateUrl: './application-management.component.html',
  styleUrls: ['./application-management.component.less']
})
export class ApplicationManagementComponent implements OnInit {
  formdata: any;  // 显示数据
  edit: Boolean;
  iframe: SafeResourceUrl;
  selectedValue;
  value: string;
  dataSet = [];
  formdata_name: string;
  formdata_useFlag: string;
  formdata_baseUrl: string;
  formdata_modelId: string;
  formdata_des: string;
  id: string;
  name = '';
  num: number;
  template: string;
  loading: boolean;
  listOfSelection: any;
  key: string;
  url: string;
  type: string;
  modelId: string;
  src: string;
  sort: any;
  inputValue: string;
  size: string; // 按钮尺寸
  isVisibleMiddle = false;
  isVisibleMiddle1 = false;
  isVisibleSetMiddle = false;
  isVisibleSetMiddleser = false;
  isVisibleSetMiddleser1 = false;
  showpop = false;
  allChecked = false;
  indeterminate = false;
  displayData = [];
  constructor(public router: Router, private sanitizer: DomSanitizer,
    public activatedRoute: ActivatedRoute,  private message: NzMessageService, private http: HttpService) {
    this.activatedRoute.queryParams.subscribe(Params => {
      // this.parmlen = Object.keys(Params).length;
      this.id = Params['id'];
      this.key = Params['key'];
      this.url = Params['url'];
      this.type = Params['type'];
      this.modelId = Params['modelId'];
      // this.src = 'http://192.168.1.252:8099/model/create?name=' + this.name + '&key=' + this.key + '&description=' + this.description;
      // tslint:disable-next-line:max-line-length
      if (this.type === 'add') {
        // tslint:disable-next-line:max-line-length
        this.src = 'http://hjj.ngrok.michaelch.xyz/' + this.url;
      } else if (this.type === 'edit') {
        this.edit = true;
        this.src = 'http://hjj.ngrok.michaelch.xyz/modeler.html?modelId=' + this.modelId + '&key=' + this.key;
      }
      this.iframe = this.sanitizer.bypassSecurityTrustResourceUrl(this.src);
    });
  }
  cancel() {
    this.message.info('取消保存!');
  }

  confirm() {
    this.message.info('保存成功!');
    this.gorouter('home/application');
  }

  handleCancelMiddle(): void {
    this.isVisibleMiddle = false;
    this.showpop = false;
    this.isVisibleMiddle1 = false;
  }

  showModalEditMiddle() {

  }
  handleOkEditMiddle() {
    this.showpop = false;
  }

  handleCancelEditMiddle() {
    this.showpop = false;
  }

  showModalSetMiddle() {
    this.isVisibleSetMiddle = true;
  }
  handleCancelSetMiddle() {
    console.log('click Cancel');
    this.isVisibleSetMiddle = false;
    this.isVisibleSetMiddleser = false;
    this.isVisibleSetMiddleser1 = false;

  }
  currentPageDataChange($event: Array<{ name: string; age: number; address: string; checked: boolean; disabled: boolean; }>): void {
    this.displayData = $event;
    this.refreshStatus();
  }

  refreshStatus() {
    const allChecked = this.displayData.filter(value => !value.disabled).every(value => value.checked === true);
    const allUnChecked = this.displayData.filter(value => !value.disabled).every(value => !value.checked);
    if (this.dataSet.length !== 0) {
      this.allChecked = allChecked;
    }
    this.indeterminate = (!allChecked) && (!allUnChecked);
  }

  checkAll(value: boolean): void {
    this.displayData.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }
  ngOnInit() {
    this.http.httpmenderget('/applicationsystem/findById?id=' + this.id).subscribe(data => {
      if ( data.result === '0000') {
        this.formdata = data.data.data;
        this.formdata_name = this.formdata.name;
        this.formdata_useFlag = this.formdata.useFlag;
        this.formdata_baseUrl = this.formdata.baseUrl;
        this.formdata_des = this.formdata.des;
        this.http.httpmender('/activiti/modelList?modType=1', {}).subscribe(data1 => {
          if (data1.result === '0000') {
            for (let i = 0; i < data1.data.data.length; i++) {
              if (data1.data.data[i].id === this.formdata.modelId.split('|')[0]) {
                this.formdata_modelId = data1.data.data[i].name;
              }
            }
          } else {
            this.message.create('error', data1.msg);
          }
        }, error => this.message.create('error', error));
      } else {
        this.message.create('error', data.msg);
      }
    });
  }
  gorouter(item: any) {
    // 	if(this.tabs.indexOf(item.split('/')[1])==-1){
    // 		this.tabs.push(item.split('/')[1]);
    this.router.navigateByUrl(item);
    // 	}else{
    // 		this.router.navigateByUrl(item);
    // 	}
  }
  tjsq(a: number) {
    if (a === 1) {
      this.isVisibleSetMiddleser = true;
    } else if (a === 2) {
      this.isVisibleSetMiddleser1 = true;
    } else if (a === 2) {
      this.isVisibleSetMiddleser1 = true;
    }
  }
  add() {
    this.showpop = true;
  }
  // 模态框
  handleOkMiddle(): void {
    console.log('click ok');
    this.isVisibleMiddle = false;
    // this.isVisibleMiddle1 = false;
    this.isVisibleSetMiddleser = false;
    this.showpop = false;
  }
}
