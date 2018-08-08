import { Component, OnInit } from '@angular/core';
import * as G2 from '@antv/g2';
@Component({
  selector: 'app-antv',
  templateUrl: './antv.component.html',
  styleUrls: ['./antv.component.less']
})
export class AntvComponent implements OnInit {

  title = 'app';
  data = {};
  chart ;
  data2 = {};
  chart2;
  graph;
  constructor() { }
  ngOnInit() {
    this.chartData();
  }
  chartData() {
     this.data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 }
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
      width : 600, // 指定图表宽度
      height : 300 // 指定图表高度
    });
    this.chart2 = new G2.Chart({
      container: 'c2',
      forceFit: true,
      width : 600, // 指定图表宽度
      height : 300 // 指定图表高度
    });

    this.chart.source(this.data);
    this.chart2.source(this.data2, {
      percent: {
        formatter: function formatter(val) {
          debugger;
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
    //  渲染图表
    this.chart.render();
    this.chart2.render();
  }

}
