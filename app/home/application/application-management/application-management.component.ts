import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import * as jsp from 'jsplumb';
import * as $ from 'jquery';
@Component({
  selector: 'app-application-management',
  templateUrl: './application-management.component.html',
  styleUrls: ['./application-management.component.less']
})
export class ApplicationManagementComponent implements OnInit {
  selectedValue;
  value: string;
  dataSet = [];
  mk2:boolean=false;
  mk1:boolean=false;
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
  jsplmdIs = true;
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
  constructor(public router: Router,private nzMessageService: NzMessageService) {

  }
  ngOnInit(){
    for (let i = 0; i < 30; i++) {
      this.dataSet.push({
        key: i.toString(),
        num: i,
        name: `厚德平台${i}`,
        describe: `操作系统 no. ${i}`,
        template: '启用',
      });
    }
  }
  gorouter(item: any) {
    // 	if(this.tabs.indexOf(item.split('/')[1])==-1){
    // 		this.tabs.push(item.split('/')[1]);
    this.router.navigateByUrl(item);
    // 	}else{
    // 		this.router.navigateByUrl(item);
    // 	}
  }
  tjsq(a:number){
    if(a==1){
      this.isVisibleSetMiddleser=true;
    }
    else if(a==2){
      this.isVisibleSetMiddleser1=true;
    }
  }
  gorouter(item: any) {
    console.log(item);
    // 	if(this.tabs.indexOf(item.split('/')[1])==-1){
    // 		this.tabs.push(item.split('/')[1]);
    this.router.navigateByUrl(item);
    // 	}else{
    // 		this.router.navigateByUrl(item);
    // 	}
  }
  add(){
    this.showpop=true;
  }
  ngAfterViewInit(): void {
    // this.loading = false;
    // this.updateEditCache();

    var jsPlumb = jsp.jsPlumb;
    jsPlumb.setContainer($("#canvas"));
    var instance = jsPlumb.getInstance({
      // default drag options
      DragOptions: { cursor: 'pointer', zIndex: 2000 },
      // the overlays to decorate each connection with.  note that the label overlay uses a function to generate the label text; in this
      // case it returns the 'labelText' member that we set on each connection in the 'init' method below.
      ConnectionOverlays: [
        ['Arrow', {
          location: 1,
          visible: true,
          width: 5,
          length: 5,
          id: 'ARROW',
          events: {
            click: function () { alert('you clicked on the arrow overlay') }
          }
        }],
        ['Label', {
          location: 0.1,
          id: 'label',
          cssClass: "aLabel",
          events: {
            // connection.getOverlay("label")
            tap: function () {
              let label = prompt('请输入标签文字：');
              this.setLabel(label);
            }
          }
        }],

      ]
    });

    var basicType = {
      connector: 'StateMachine',
      paintStyle: { stroke: 'red', strokeWidth: 4 },
      hoverPaintStyle: { stroke: 'blue' },
      overlays: [
        'Arrow'
      ]
    };
    instance.registerConnectionType('basic', basicType);

    // this is the paint style for the connecting lines..
    var connectorPaintStyle = {
        strokeWidth: 3,
        stroke: '#61B7CF',
        outlineStroke: 'white',
        outlineWidth: 5
      },
      // .. and this is the hover style.
      connectorHoverStyle = {
        strokeWidth: 3,
        stroke: '#216477',
        outlineWidth: 5,
        outlineStroke: 'white'
      },
      endpointHoverStyle = {
        fill: '#216477',
        stroke: '#216477'
      },
      // the definition of source endpoints (the small blue ones)
      sourceEndpoint = {
        endpoint: 'Dot',
        paintStyle: {
          stroke: '#7AB02C',
          fill: 'transparent',
          radius: 7,
          strokeWidth: 1
        },
        isSource: true,
        connector: ['Flowchart', { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true }],
        connectorStyle: connectorPaintStyle,
        hoverPaintStyle: endpointHoverStyle,
        connectorHoverStyle: connectorHoverStyle,
        dragOptions: {},
        overlays: [
          ['Arrow', {
            location: [0.5, 1.5],
            Arrow: 'Drag',
            cssClass: 'endpointSourceLabel',
            visible: false
          }]
        ]
      },
      // the definition of target endpoints (will appear when the user drags a connection)
      targetEndpoint = {
        endpoint: 'Dot',
        paintStyle: { fill: '#7AB02C', radius: 7 },
        hoverPaintStyle: endpointHoverStyle,
        maxConnections: -1,
        dropOptions: { hoverClass: 'hover', activeClass: 'active' },
        isTarget: true,
        overlays: [
          ['Label', { location: [0.5, -0.5], label: 'Drop', cssClass: 'endpointTargetLabel', visible: false }]
        ]
      },
      init = function (connection) {
        // connection.getOverlay('label').setLabel(connection.sourceId.substring(15) + '-' + connection.targetId.substring(15));
      };
      var _addEndpoints = function (toId, sourceAnchors, targetAnchors) {
      for (var i = 0; i < sourceAnchors.length; i++) {
        var sourceUUID = toId + sourceAnchors[i];
        instance.addEndpoint("flowchart" + toId, sourceEndpoint, {
          anchor: sourceAnchors[i], uuid: sourceUUID
        });
      }
      for (var j = 0; j < targetAnchors.length; j++) {
        var targetUUID = toId + targetAnchors[j];
        instance.addEndpoint("flowchart" + toId, targetEndpoint, { anchor: targetAnchors[j], uuid: targetUUID });
      }
    };

    // suspend drawing and initialise.
    instance.batch(function () {
      _addEndpoints('Window4', ['TopCenter', 'BottomCenter'], ['LeftMiddle', 'RightMiddle']);
      _addEndpoints('Window2', ['LeftMiddle', 'BottomCenter'], ['TopCenter', 'RightMiddle']);

      _addEndpoints('Window3', ['RightMiddle', 'BottomCenter'], ['LeftMiddle', 'TopCenter']);
      _addEndpoints('Window1', ['LeftMiddle', 'RightMiddle'], ['TopCenter', 'BottomCenter']);

      // _addEndpoints('Window5', ['LeftMiddle', 'BottomCenter'], ['TopCenter', 'RightMiddle']);
      //
      // _addEndpoints('Window6', ['LeftMiddle', 'BottomCenter'], ['TopCenter', 'RightMiddle']);

      // listen for new connections; initialise them the same way we initialise the connections at startup.
      instance.bind('connection', function (connInfo, originalEvent) {
        init(connInfo.connection);
      });
      // make all the window divs draggable
      // instance.draggable(jsPlumb.getSelector('.flowchart-demo .window'), { grid: [20, 20] });

      //上一句为元素拖动
      // THIS DEMO ONLY USES getSelector FOR CONVENIENCE. Use your library's appropriate selector
      // method, or document.querySelectorAll:
      // jsPlumb.draggable(document.querySelectorAll(".window"), { grid: [20, 20] });

      // connect a few up
      instance.connect({ uuids: ['Window1RightMiddle', 'Window2LeftMiddle'], editable: true });
      instance.connect({ uuids: ['Window2RightMiddle', 'Window3LeftMiddle'], editable: true });
      instance.connect({ uuids: ['Window3RightMiddle', 'Window4LeftMiddle'], editable: true });
        // instance.connect({ uuids: ['Window5RightMiddle', 'Window6LeftMiddle'], editable: true });
        // instance.connect({ uuids: ['Window6RightMiddle', 'Window7LeftMiddle'], editable: true });
        // instance.connect({ uuids: ['Window7RightMiddle', 'Window8LeftMiddle'], editable: true });
      // listen for clicks on connections, and offer to delete connections on click.
      //
      instance.bind('click', function (conn, originalEvent) {
        // if (confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?"))
        //   instance.detach(conn);
        conn.toggleType('basic');
      });

      instance.bind('connectionDrag', function (connection) {
        console.log('connection ' + connection.id + ' is being dragged. suspendedElement is ', connection.suspendedElement, ' of type ', connection.suspendedElementType);
      });

      instance.bind('connectionDragStop', function (connection) {
        console.log('connection ' + connection.id + ' was dragged');
      });

      instance.bind('connectionMoved', function (params) {
        console.log('connection ' + params.connection.id + ' was moved');
      });
    });
    jsPlumb.fire('jsPlumbDemoLoaded', instance);
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
    this.isVisibleSetMiddleser=true;
  }
  handleOkMiddle(): void {
    console.log('click ok');
    this.isVisibleMiddle = false;
    // this.isVisibleMiddle1 = false;
    this.isVisibleSetMiddleser = false;
    this.showpop = false;
  }
  cancel(): void {
    this.nzMessageService.info('取消保存!');
  }

  confirm(): void {
    this.nzMessageService.info('保存成功!');
    this.gorouter('home/application');
  }

  handleCancelMiddle(): void {

    console.log('click Cancel');
    this.isVisibleMiddle = false;
    this.showpop = false;
    this.isVisibleMiddle1 = false;

  }

  showModalEditMiddle(): void {
    this.isVisibleEditMiddle = true;
  }
  handleOkEditMiddle(): void {
    console.log('click ok');
    this.isVisibleEditMiddle = false;
    this.showpop = false;
  }

  handleCancelEditMiddle(): void {
    console.log('click Cancel');
    this.isVisibleEditMiddle = false;
    this.showpop = false;
  }



  // 添加一行数据
  addRow(): void {
    this.showModalMiddle();
    this.i++;
    this.dataSet = [...this.dataSet, {
      key: `${this.i}`,
      name: '流程模板',
      describe: '',
      template: '',
      roe: '',
    }];
    console.log(this.dataSet);
    this.updateEditCache();
  }


  abdeRow() {
    console.log(1);
    this.isVisibleMiddle1 = true;
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
  // 以上流程图代码------------------------------------------------------------------
  showModalSetMiddle(): void {
    this.isVisibleSetMiddle = true;
  }
  handleOkSetMiddle(): void {
    console.log('click ok');
    this.isVisibleSetMiddle = false;
    this.isVisibleSetMiddleser = false;
    this.mk1 = true;
  }
  handleOkSetMiddle1(): void {

    this.isVisibleSetMiddleser1 = false;
    this.mk2 = true;
  }
  handleCancelSetMiddle(): void {
    console.log('click Cancel');
    this.isVisibleSetMiddle = false;
    this.isVisibleSetMiddleser = false;
    this.isVisibleSetMiddleser1 = false;

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
