import { Component, OnInit } from '@angular/core';
import * as G2 from '@antv/g2';
import * as $ from 'jquery';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less']
})
export class HomePageComponent implements OnInit {
  private hide: Boolean = false;
  isVisibleMiddle = false;
  dataView = false;
  dataNotView = true;
  chart;
  chart1;
  chart2;
  chart3;
  data = {};
  data1 = {};
  data2 = {};
  data3 = {};
  gridStyle = {
    width: '24%',
    textAlign: 'center',
    marginLeft: '10px',
  };
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
  constructor() { }
  ngOnInit() {
    // this.init();
    this.chartData();
  }
  changeView() {
    this.dataView = true;
    this.dataNotView = !this.dataView;
  }
  changeNotView() {
    this.dataNotView = true;
    this.dataView = !this.dataNotView;
  }
  chartData() {
    this.data = [{
      country: 'Asia',
      year: '1750',
      value: 502
    }, {
      country: 'Asia',
      year: '1800',
      value: 635
    }, {
      country: 'Asia',
      year: '1850',
      value: 809
    }, {
      country: 'Asia',
      year: '1900',
      value: 5268
    }, {
      country: 'Asia',
      year: '1950',
      value: 4400
    }, {
      country: 'Asia',
      year: '1999',
      value: 3634
    }, {
      country: 'Asia',
      year: '2050',
      value: 947
    }, {
      country: 'Africa',
      year: '1750',
      value: 106
    }, {
      country: 'Africa',
      year: '1800',
      value: 107
    }, {
      country: 'Africa',
      year: '1850',
      value: 111
    }, {
      country: 'Africa',
      year: '1900',
      value: 1766
    }, {
      country: 'Africa',
      year: '1950',
      value: 221
    }, {
      country: 'Africa',
      year: '1999',
      value: 767
    }, {
      country: 'Africa',
      year: '2050',
      value: 133
    }, {
      country: 'Europe',
      year: '1750',
      value: 163
    }, {
      country: 'Europe',
      year: '1800',
      value: 203
    }, {
      country: 'Europe',
      year: '1850',
      value: 276
    }, {
      country: 'Europe',
      year: '1900',
      value: 628
    }, {
      country: 'Europe',
      year: '1950',
      value: 547
    }, {
      country: 'Europe',
      year: '1999',
      value: 729
    }, {
      country: 'Europe',
      year: '2050',
      value: 408
    }, {
      country: 'Oceania',
      year: '1750',
      value: 200
    }, {
      country: 'Oceania',
      year: '1800',
      value: 200
    }, {
      country: 'Oceania',
      year: '1850',
      value: 200
    }, {
      country: 'Oceania',
      year: '1900',
      value: 460
    }, {
      country: 'Oceania',
      year: '1950',
      value: 230
    }, {
      country: 'Oceania',
      year: '1999',
      value: 300
    }, {
      country: 'Oceania',
      year: '2050',
      value: 300
    }];
    this.chart = new G2.Chart({
      container: 'c1', // 指定图表容器 ID
      width: 550, // 指定图表宽度
      height: 280 // 指定图表高度
    });
    this.chart.source(this.data, {
      year: {
        type: 'linear',
        tickInterval: 50
      }
    });
    this.chart.tooltip({
      crosshairs: {
        type: 'line'
      }
    });
    //  渲染图表
    this.chart.areaStack().position('year*value').color('country');
    this.chart.lineStack().position('year*value').color('country').size(2);
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
    this.data2 = [{
      item: '事例一',
      count: 40,
      percent: 0.4
    }, {
      item: '事例二',
      count: 21,
      percent: 0.21
    }, {
      item: '事例三',
      count: 17,
      percent: 0.17
    }, {
      item: '事例四',
      count: 13,
      percent: 0.13
    }, {
      item: '事例五',
      count: 9,
      percent: 0.09
    }];
    this.chart2 = new G2.Chart({
      container: 'c3',
      width: 550, // 指定图表宽度
      height: 280, // 指定图表高度
      animate: false
    });
    this.chart2.source(this.data2, {
      percent: {
        formatter: function formatter(val) {
          val = val * 100 + '%';
          return val;
        }
      }
    });
    this.chart2.coord('theta', {
      radius: 0.75,
      innerRadius: 0.6
    });
    this.chart2.tooltip({
      showTitle: false,
      itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
    });
    // 辅助文本
    this.chart2.guide().html({
      position: ['50%', '50%'],
      html: '<div style="color:#8c8c8c;font-size: 14px;text-align: center;width: 10em;">主机<br><span style="color:#8c8c8c;font-size:20px">200</span>台</div>',
      alignX: 'middle',
      alignY: 'middle'
    });
    const interval = this.chart2.intervalStack().position('percent').color('item').label('percent', {
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
    this.chart2.render();
    interval.setSelected(this.data2[0]);
    $.getJSON('/assets/world.geo.json', function (mapData) {
      this.chart3 = new G2.Chart({
        container: 'c4',
        width: 550, // 指定图表宽度
        height: 280, // 指定图表高度
        padding: [55, 20]
      });
      this.chart3.tooltip({
        showTitle: false
      });
      // 同步度量
      this.chart3.scale({
        longitude: {
          sync: true
        },
        latitude: {
          sync: true
        }
      });
      this.chart3.axis(false);
      this.chart3.legend('trend', {
        position: 'left'
      });

      // 绘制世界地图背景
      const ds = new DataSet();
      const worldMap = ds.createView('back').source(mapData, {
        type: 'GeoJSON'
      });
      const worldMapView = this.chart3.view();
      worldMapView.source(worldMap);
      worldMapView.tooltip(false);
      worldMapView.polygon().position('longitude*latitude').style({
        fill: '#fff',
        stroke: '#ccc',
        lineWidth: 1
      });

      // 可视化用户数据
      this.data3 = [{
        name: 'Russia',
        value: 86.8
      }, {
        name: 'China',
        value: 106.3
      }, {
        name: 'Japan',
        value: 94.7
      }, {
        name: 'Mongolia',
        value: 98
      }, {
        name: 'Canada',
        value: 98.4
      }, {
        name: 'United Kingdom',
        value: 97.2
      }, {
        name: 'United States of America',
        value: 98.3
      }, {
        name: 'Brazil',
        value: 96.7
      }, {
        name: 'Argentina',
        value: 95.8
      }, {
        name: 'Algeria',
        value: 101.3
      }, {
        name: 'France',
        value: 94.8
      }, {
        name: 'Germany',
        value: 96.6
      }, {
        name: 'Ukraine',
        value: 86.3
      }, {
        name: 'Egypt',
        value: 102.1
      }, {
        name: 'South Africa',
        value: 101.3
      }, {
        name: 'India',
        value: 107.6
      }, {
        name: 'Australia',
        value: 99.9
      }, {
        name: 'Saudi Arabia',
        value: 130.1
      }, {
        name: 'Afghanistan',
        value: 106.5
      }, {
        name: 'Kazakhstan',
        value: 93.4
      }, {
        name: 'Indonesia',
        value: 101.4
      }];
      const userDv = ds.createView().source(this.data3).transform({
        geoDataView: worldMap,
        field: 'name',
        type: 'geo.region',
        as: ['longitude', 'latitude']
      }).transform({
        type: 'map',
        callback: function callback(obj) {
          // obj.trend = obj.value > 100 ? '男性更多' : '女性更多';
           obj.trend = '';
          return obj;
        }
      });
      const userView = this.chart3.view();
      userView.source(userDv, {
        'trend': {
          alias: '显示测试'
        }
      });
      userView.polygon().position('longitude*latitude').color('trend',
      ['#F51D27', '#0A61D7']).opacity('value').tooltip('name*trend').animate({
        leave: {
          animation: 'fadeOut'
        }
      });
      this.chart3.render();
    });
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
  onValueChange(value: Date): void {
    console.log(`Current value: ${value}`);
  }

  onModeChange(mode: 'month' | 'year'): void {
    console.log(`Current mode: ${mode}`);
  }
}
