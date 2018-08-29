import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpService } from '../../http/http.service';
@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.less']
})
export class ApplicationComponent implements OnInit {
  i = 1;
  editCache = {};
  dataSet = [];
  dataId: string;
  loading = true;
  isVisibleMiddle = false;
  isVisibleEditMiddle = false;
  sortName = null;
  sortValue = null;
  size = 'small'; // 按钮尺寸
  num: number;
  name: string;
  userFlag: number;
  baseUrl: string;
  modelId: string;
  des: string;
  listOfSearchName = [];
  searchAddress: string;
  validateForm: FormGroup;
  editdateForm: FormGroup;
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
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
  }

  checkAll(value: boolean): void {
    this.dataSet.forEach(data => data.checked = value);
    this.refreshStatus();
  }
  // 自定义选项结束
  startEdit(id: string): void {
    // this.editCache[key].edit = true;
    this.dataId = id;
    this.showModalEditMiddle(id);
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
  constructor(public router: Router, private fb: FormBuilder, private http: HttpService) { }
  gorouter(item: any) {
    console.log(item);
    // 	if(this.tabs.indexOf(item.split('/')[1])==-1){
    // 		this.tabs.push(item.split('/')[1]);
    this.router.navigateByUrl(item);
    // 	}else{
    // 		this.router.navigateByUrl(item);
    // 	}
  }
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required] ],
      userFlag: [null, [Validators.required] ],
      des: [null, [Validators.required] ],
      baseUrl: [null, [Validators.required] ],
      modelId: [null, [Validators.required] ]
    });
    this.initData();
    this.loading = false;
    this.updateEditCache();
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
    }
    // } else if (selecValue === '应用系统描述') {
    //   dataSearch = {
    //     'des': inputValue,
    //   };
    // }
    console.log(JSON.stringify(dataSearch));
    this.http.httpmender('/applicationsystem/findList', JSON.stringify(dataSearch)).subscribe(data => {
      console.log(data.data.成功); this.dataSet = data.data.成功;
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
  initData(): void {
    this.http.httpmender('/applicationsystem/findList', {}).subscribe(data => { this.dataSet = data.data.成功; });
    for (let i = 0; i < this.dataSet.length; i++) {
      this.dataSet[i].checked = false;
    }
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
    this.updateEditCache();
  }
  // 删除
  deleteRow(i: any): void {
    // const dataSet = this.dataSet.filter(d => d.key !== i);
    // this.dataSet = dataSet;
    this.http.httpmenderdel('/applicationsystem/delAppliById?id=' + i ).subscribe(data => console.log(data));
    this.initData();
  }
  submitForm = (value) => {
    // $event.preventDefault();
    // tslint:disable-next-line:forin
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    value.state = 0;
    // value.id = 'string';
    value = JSON.stringify(value);
    if (this.validateForm.invalid) { return; }
    this.http.httpmender('/applicationsystem/addUser', value).subscribe(data => console.log(data));
    this.isVisibleMiddle = false;
    this.gorouter('home/applicationManagement');
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
    this.http.httpmenderput('/applicationsystem/updateAppli', value).subscribe(data => console.log(data));
    this.initData();
    this.isVisibleEditMiddle = false;
  }
}
