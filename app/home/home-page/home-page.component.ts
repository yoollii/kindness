import { Component, OnInit } from '@angular/core';
import * as G2 from '@antv/g2';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less']
})
export class HomePageComponent implements OnInit {
  private hide: Boolean = false;
  isVisibleMiddle = false;
  chart;
  chart1;
  data = {};
  data1 = {};
  panels = [
    {
      active: true,
      disabled: false,
      name: '我的任务',
      arrow: true,
      data1: '完成**运输',
      data2: '前往**部门报道',
    },
    {
      active: false,
      disabled: false,
      name: '消息列表',
      arrow: true,
      data1: '**设备更新',
      data2: '今天建军节',
    },
    {
      active: false,
      disabled: false,
      name: '操作日志',
      arrow: true,
      data1: '新增',
      data2: '删除',
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
    this.chartData();
  }
  chartData() {
    this.data = [
      { genre: '待分解任务数量', sold: 275 },
      { genre: '待审批任务数量', sold: 115 },
      { genre: '正在执行任务数量', sold: 120 },
      { genre: '已完成任务数量', sold: 350 },
    ];
    this.chart = new G2.Chart({
      container: 'c1', // 指定图表容器 ID
      width: 550, // 指定图表宽度
      height: 280 // 指定图表高度
    });
    this.chart.source(this.data);
    this.chart.interval().position('genre*sold').color('genre');
    //  渲染图表
    this.chart.render();

    this.data1 = [{
      year: '一月',
      value: 3
    }, {
        year: '二月',
      value: 4
    }, {
        year: '三月',
      value: 3
    }, {
        year: '四月',
      value: 5
    }, {
        year: '五月',
      value: 5
    }, {
        year: '六月',
      value: 6
    }, {
        year: '七月',
      value: 7
    }, {
        year: '八月',
      value: 9
    }, {
        year: '九月',
      value: 14
      }, {
        year: '十月',
        value: 8
      }, {
        year: '十一月',
        value: 3
      }, {
        year: '十二月',
        value: 13
      }];
    this.chart1 = new G2.Chart({
      container: 'c2',
      width: 550, // 指定图表宽度
      height: 280 // 指定图表高度
    });
    this.chart1.source(this.data1);
    this.chart1.scale('value', {
      min: 0
    });
    this.chart1.scale('year', {
      range: [0, 1]
    });
    this.chart1.tooltip({
      crosshairs: {
        type: 'line'
      }
    });
    this.chart1.line().position('year*value');
    this.chart1.point().position('year*value').size(4).shape('circle').style({
      stroke: '#fff',
      lineWidth: 1
    });
    this.chart1.render();
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
}
