import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less']
})
export class HomePageComponent implements OnInit {
  private hide: Boolean = false;
  panels = [
    {
      active: true,
      disabled: false,
      name: '我的任务',
      data1: '完成**运输',
      data2: '前往**部门报道',
      customStyle: {
        'background': '#f7f7f7',
        'border-radius': '4px',
        'margin-bottom': '24px',
        'border': '0px'
      }
    },
    {
      active: false,
      disabled: true,
      name: '消息列表',
      data1: '**设备更新',
      data2: '今天建军节',
      customStyle: {
        'background': '#f7f7f7',
        'border-radius': '4px',
        'margin-bottom': '24px',
        'border': '0px'
      }
    },
    {
      active: false,
      disabled: false,
      name: '操作日志',
      data1: '新增',
      data2: '删除',
      customStyle: {
        'background': '#f7f7f7',
        'border-radius': '4px',
        'margin-bottom': '24px',
        'border': '0px'
      }
    }
  ];
  constructor() {}
  gridStyle = {
    width: '100%',
    textAlign: 'center',
    color: 'red',
  };
  ngOnInit() {
    // this.init();
  }
}
