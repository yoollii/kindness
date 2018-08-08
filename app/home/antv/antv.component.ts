import { Component, OnInit } from '@angular/core';
import * as G2 from '@antv/g2';
@Component({
  selector: 'app-antv',
  templateUrl: './antv.component.html',
  styleUrls: ['./antv.component.less']
})
export class AntvComponent implements OnInit {

  title = 'app';
  chart;
  data = {};
  data3 = {};
  chart3;
  data2 = {};
  chart2;
  graph;
  dataSet = [
    {
      key: '1',
      model: '',
      room: '一室',
      pending: 10,
      executing: 5,
      complete: 8
    },
    {
      key: '2',
      model: '',
      room: '一室',
      pending: 9,
      executing: 6,
      complete: 7
    },
    {
      key: '3',
      model: '',
      room: '一室',
      pending: 12,
      executing: 4,
      complete: 9
    },
    {
      key: '4',
      model: '',
      room: '一室',
      pending: 6,
      executing: 12,
      complete: 7
    },
    {
      key: '5',
      model: '',
      room: '一室',
      pending: 12,
      executing: 11,
      complete: 5
    }
  ];
  constructor() { }
  ngOnInit() {
    this.chartData();
  }
  chartData() {
     this.data = [
      { genre: '待分解任务数量', sold: 275 },
      { genre: '待审批任务数量', sold: 115 },
      { genre: '正在执行任务数量', sold: 120 },
      { genre: '已完成任务数量', sold: 350 },
    ];
    this.data3 = [
      { genre: '待审批', sold: 50 },
      { genre: '已审批', sold: 150 },
      { genre: '已分解', sold: 140 },
      { genre: '已完成', sold: 280 },
    ];
    this.data2 = [{
      item: '待分解',
      count: 60,
      percent: 0.6
    }, {
      item: '待审批',
      count: 20,
      percent: 0.20
    }, {
      item: '正在执行',
      count: 10,
      percent: 0.1
    }, {
      item: '已完成',
      count: 10,
      percent: 0.10
    }];
     this.chart = new G2.Chart({
      container: 'c1', // 指定图表容器 ID
      width : 550, // 指定图表宽度
      height : 300 // 指定图表高度
    });
    this.chart2 = new G2.Chart({
      container: 'c2',
      // forceFit: true,  // 当 forceFit: true 时宽度配置不生效。
      width: 550, // 指定图表宽度
      height: 300 // 指定图表高度
    });
    this.chart3 = new G2.Chart({
      container: 'c3', // 指定图表容器 ID
      width: 550, // 指定图表宽度
      height: 300 // 指定图表高度
    });
    this.chart.source(this.data);
    this.chart3.source(this.data3);
    this.chart2.source(this.data2, {
      percent: {
        formatter: function formatter(val) {
          val = val * 100 + '%';
          return val;
        }
      }
    });
    this.chart2.coord('theta', {
      radius: 0.75
    });
    this.chart2.tooltip({
      showTitle: false,
      itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
    });
    this.chart2.intervalStack().position('percent').color('item').label('percent', {
      formatter: function formatter(val, item) {
        return item.point.item + ': ' + val;
      }
    }).tooltip('item*percent', function (item, percent) {
      percent = percent * 100 + '%';
      return {
        name: item,
        value: percent
      };
    }).style({
      lineWidth: 1,
      stroke: '#fff'
    });
    this.chart.interval().position('genre*sold').color('genre');
    this.chart3.interval().position('genre*sold').color('genre');
    //  渲染图表
    this.chart.render();
    this.chart2.render();
    this.chart3.render();
  }

}
