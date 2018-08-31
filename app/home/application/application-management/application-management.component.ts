import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import * as jsp from 'jsplumb';
import * as $ from 'jquery';

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
  selectedValue;
  value: string;
  dataSet = [];
  name = '';
  num: number;
  template: string;
  loading: boolean;
  listOfSelection: any;
  sort: any;
  mk2 = false;
  mk1 = false;
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
  // data = [
  //   {
  //     num: '1',
  //     nam: '服务名称1',
  //     state: '启动',
  //     descripe: '服务描述1',
  //   },
  //   {
  //     num: '2',
  //     nam: '服务名称2',
  //     state: '启动',
  //     descripe: '服务描述2',
  //   },
  //   {
  //     num: '3',
  //     nam: '服务名称3',
  //     state: '启动',
  //     descripe: '服务描述3',
  //   },
  //   {
  //     num: '4',
  //     nam: '服务名称4',
  //     state: '停用',
  //     descripe: '服务描述4',
  //   },
  //   {
  //     num: '5',
  //     nam: '服务名称5',
  //     state: '启动',
  //     descripe: '服务描述5',
  //   }
  // ];
  data = [
    {
      key     : 1,
      name    : '服务一',
      age     : '启用',
      address : '厚德系统服务一',
      children: [
        {
          key    : 11,
          name   : '服务二',
          age    : '启用',
          address: '厚德系统服务二'
        },
        {
          key     : 12,
          name    : '服务三',
          age     : '启用',
          address : '厚德系统服务三',
          children: [ {
            key    : 121,
            name   : '服务四',
            age    : '启用',
            address: '厚德系统服务四'
          } ]
        },
        {
          key     : 13,
          name    : '服务五',
          age     : '启用',
          address : '厚德系统服务四',
          children: [
            {
              key     : 131,
              name    : '服务五',
              age     : '启用',
              address : '厚德系统服务四',
              children: [
                {
                  key    : 1311,
                  name   : '服务六',
                  age    : '启用',
                  address: '厚德系统服务五'
                },
                {
                  key    : 1312,
                  name   : '服务七',
                  age    : '启用',
                  address: '厚德系统服务六'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      key    : 2,
      name   : '服务八',
      age    : '启用',
      address: '厚德系统服务七'
    }
  ];
  expandDataCache = {};

  collapse(array: TreeNodeInterface[], data: TreeNodeInterface, $event: boolean): void {
    if ($event === false) {
      if (data.children) {
        data.children.forEach(d => {
          const target = array.find(a => a.key === d.key);
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  convertTreeToList(root: object): TreeNodeInterface[] {
    const stack = [];
    const array = [];
    const hashMap = {};
    stack.push({ ...root, level: 0, expand: false });

    while (stack.length !== 0) {
      const node = stack.pop();
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({ ...node.children[ i ], level: node.level + 1, expand: false, parent: node });
        }
      }
    }

    return array;
  }

  visitNode(node: TreeNodeInterface, hashMap: object, array: TreeNodeInterface[]): void {
    if (!hashMap[ node.key ]) {
      hashMap[ node.key ] = true;
      array.push(node);
    }
  }
  constructor(public router: Router, private nzMessageService: NzMessageService) {
  }
  cancel() {
    this.nzMessageService.info('取消保存!');
  }

  confirm() {
    this.nzMessageService.info('保存成功!');
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
  // 以上流程图代码------------------------------------------------------------------

  showModalSetMiddle() {
    this.isVisibleSetMiddle = true;
  }
  handleOkSetMiddle() {
    console.log('click ok');
    this.isVisibleSetMiddle = false;
    this.isVisibleSetMiddleser = false;
    this.mk1 = true;
  }
  handleOkSetMiddle1() {
    this.isVisibleSetMiddleser1 = false;
    this.mk2 = true;
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
  ngOnInit() {
    this.data.forEach(item => {
      this.expandDataCache[ item.key ] = this.convertTreeToList(item);
    });
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
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    // this.loading = false;
    // this.updateEditCache();

    const jsPlumb = jsp.jsPlumb;
    (jsPlumb as any).setContainer($('#canvas'));
    const instance = jsPlumb.getInstance({
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
            click: function () { alert('you clicked on the arrow overlay'); }
          }
        }],
        ['Label', {
          location: 0.1,
          id: 'label',
          cssClass: 'aLabel',
          events: {
            // connection.getOverlay("label")
            tap: function () {
              const label = prompt('请输入标签文字：');
              this.setLabel(label);
            }
          }
        }]
      ]
    });

    const basicType = {
      connector: 'StateMachine',
      paintStyle: { stroke: 'red', strokeWidth: 4 },
      hoverPaintStyle: { stroke: 'blue' },
      overlays: [
        'Arrow'
      ]
    };
    instance.registerConnectionType('basic', basicType);

    // this is the paint style for the connecting lines..
    const connectorPaintStyle = {
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
      const _addEndpoints = function (toId, sourceAnchors, targetAnchors) {
      for (let i = 0; i < sourceAnchors.length; i++) {
        const sourceUUID = toId + sourceAnchors[i];
        (instance as any).addEndpoint('flowchart' + toId, sourceEndpoint, {
          anchor: sourceAnchors[i], uuid: sourceUUID
        });
      }
      for (let j = 0; j < targetAnchors.length; j++) {
        const targetUUID = toId + targetAnchors[j];
        (instance as any).addEndpoint('flowchart' + toId, targetEndpoint, { anchor: targetAnchors[j], uuid: targetUUID });
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

      // 上一句为元素拖动
      // THIS DEMO ONLY USES getSelector FOR CONVENIENCE. Use your library's appropriate selector
      // method, or document.querySelectorAll:
      // jsPlumb.draggable(document.querySelectorAll(".window"), { grid: [20, 20] });

      // connect a few up
      (instance as any).connect({ uuids: ['Window1RightMiddle', 'Window2LeftMiddle'], editable: true });
      (instance as any).connect({ uuids: ['Window2RightMiddle', 'Window3LeftMiddle'], editable: true });
      (instance as any).connect({ uuids: ['Window3RightMiddle', 'Window4LeftMiddle'], editable: true });
        // instance.connect({ uuids: ['Window5RightMiddle', 'Window6LeftMiddle'], editable: true });
        // instance.connect({ uuids: ['Window6RightMiddle', 'Window7LeftMiddle'], editable: true });
        // instance.connect({ uuids: ['Window7RightMiddle', 'Window8LeftMiddle'], editable: true });
      // listen for clicks on connections, and offer to delete connections on click.
      //
      instance.bind('click', function (conn, originalEvent) {
        // if (confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?"))
        //   instance.detach(conn);
        (conn as any).toggleType('basic');
      });

      instance.bind('connectionDrag', function (connection) {
        console.log('connection ' + (connection as any).id + ' is being dragged. suspendedElement is ', (connection as any).suspendedElement, ' of type ', (connection as any).suspendedElementType);
      });

      instance.bind('connectionDragStop', function (connection) {
        console.log('connection ' + (connection as any).id + ' was dragged');
      });

      instance.bind('connectionMoved', function (params) {
        console.log('connection ' + (params as any).connection.id + ' was moved');
      });
    });
    (jsPlumb as any).fire('jsPlumbDemoLoaded', instance);
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
