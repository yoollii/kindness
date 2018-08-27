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
    for (let i = 0; i < 30; i++) {
      this.dataSet.push({
        key: i.toString(),
        num: i,
        name: '厚德平台',
        des: `操作系统 no. ${i}`,
        modelId: '模板',
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
  handleOkMiddle(data): void {
    this.submitForm(Event, data);
  }

  handleCancelMiddle(): void {
    console.log('click Cancel');
    this.isVisibleMiddle = false;
  }
  showModalEditMiddle(): void {
    this.isVisibleEditMiddle = true;
  }
  handleOkEditkMiddle(): void {
    console.log('click ok');
    this.isVisibleEditMiddle = false;
  }

  handleCancelEditMiddle(): void {
    console.log('click Cancel');
    this.isVisibleEditMiddle = false;
  }


  // 添加一行数据
  addRow(): void {
    this.showModalMiddle();
    this.i++;
    this.dataSet = [...this.dataSet, {
      key: `${this.i}`,
      name: '厚德平台',
      des: `操作系统 no. ${this.i}`,
      modelId: '模板',
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

  submitForm = ($event, value) => {
    // $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    value.state = 0;
    value.id = 'string';
    value = JSON.stringify(value);
    console.log(value);
    if (this.validateForm.invalid) { return; }
    this.http.httpmender('/applicationsystem/addUser', value).subscribe(data => console.log(data));
    this.isVisibleMiddle = false;
    this.gorouter('home/applicationManagement');
  }
}
