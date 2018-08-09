import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application-management',
  templateUrl: './application-management.component.html',
  styleUrls: ['./application-management.component.less']
})
export class ApplicationManagementComponent implements OnInit {
  selectedValue;
  value: string;
  inputValue: string;
  size: string; // 按钮尺寸
  isVisibleMiddle = false;
  isVisibleSetMiddle = false;
  allChecked = false;
  indeterminate = false;
  displayData = [];
  data = [
    {
      num: '1',
      nam: '服务名称1',
      state: '启动',
      descripe: '服务描述1',
    },
    {
      num: '2',
      nam: '服务名称2',
      state: '启动',
      descripe: '服务描述2',
    },
    {
      num: '3',
      nam: '服务名称3',
      state: '启动',
      descripe: '服务描述3',
    },
    {
      num: '4',
      nam: '服务名称4',
      state: '停用',
      descripe: '服务描述4',
    },
    {
      num: '5',
      nam: '服务名称5',
      state: '启动',
      descripe: '服务描述5',
    }
  ];

  constructor(public router: Router) { }
  gorouter(item: any) {
    // 	if(this.tabs.indexOf(item.split('/')[1])==-1){
    // 		this.tabs.push(item.split('/')[1]);
    this.router.navigateByUrl(item);
    // 	}else{
    // 		this.router.navigateByUrl(item);
    // 	}
  }
  ngOnInit() {
  }
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
  showModalSetMiddle(): void {
    this.isVisibleSetMiddle = true;
  }
  handleOkSetMiddle(): void {
    console.log('click ok');
    this.isVisibleSetMiddle = false;
  }

  handleCancelSetMiddle(): void {
    console.log('click Cancel');
    this.isVisibleSetMiddle = false;
  }
  currentPageDataChange($event: Array<{ name: string; age: number; address: string; checked: boolean; disabled: boolean; }>): void {
    this.displayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    const allChecked = this.displayData.filter(value => !value.disabled).every(value => value.checked === true);
    const allUnChecked = this.displayData.filter(value => !value.disabled).every(value => !value.checked);
    this.allChecked = allChecked;
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
}
