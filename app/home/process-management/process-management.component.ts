import { Component, OnInit } from '@angular/core';
import * as jsp from 'jsplumb';
@Component({
  selector: 'app-process-management',
  templateUrl: './process-management.component.html',
  styleUrls: ['./process-management.component.less']
})
export class ProcessManagementComponent implements OnInit {
  i = 1;
  editCache = {};
  dataSet = [];
  jsplmdIs:boolean=false;
  loading = true;
  isVisibleMiddle = false;
  isVisibleMiddle1 = false;
  isVisibleEditMiddle = false;
  sortName = null;
  sortValue = null;
  num: number;
  size = 'small'; // 按钮尺寸
  name: string;
  template: string;
  role: string;
  describe: string;
  listOfSearchName = [];
  searchAddress: string;
  panels = [
    {
      active    : true,
      name      : '当前模版预览',
      disabled  : false,
      customStyle: {
        'background'   : '#f7f7f7',
        'border-radius': '4px',
        'margin-bottom': '24px',
      }
    }

  ];
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

  refreshStatus(event): void {
    this.jsplmdIs=event;
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
  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < 30; i++) {
      this.dataSet.push({
        key: i.toString(),
        num: i,
        name: '流程模板',
        describe: '',
        template: '',
        roe: '',
        checked: false
      });
    }
    this.loading = false;
    this.updateEditCache();
    var jsPlumb = jsp.jsPlumb;
    var instance = jsPlumb.getInstance({
      // default drag options
      DragOptions: { cursor: 'pointer', zIndex: 2000 },
      // the overlays to decorate each connection with.  note that the label overlay uses a function to generate the label text; in this
      // case it returns the 'labelText' member that we set on each connection in the 'init' method below.
      ConnectionOverlays: [
        ["Arrow", {
          location: 1,
          visible: true,
          width: 5,
          length: 5,
          id: "ARROW",
          events: {
            click: function () { alert("you clicked on the arrow overlay") }
          }
        }],
        ["Label", {
          location: 0.1,
          id: "label",
          cssClass: "aLabel",
          events: {
            // connection.getOverlay("label")
            tap: function () {
              let label = prompt("请输入标签文字：");
              this.setLabel(label);
            }
          }
        }]
      ],
      Container: "canvas"
    });

    var basicType = {
      connector: "StateMachine",
      paintStyle: { stroke: "red", strokeWidth: 4 },
      hoverPaintStyle: { stroke: "blue" },
      overlays: [
        "Arrow"
      ]
    };
    instance.registerConnectionType("basic", basicType);

    // this is the paint style for the connecting lines..
    var connectorPaintStyle = {
        strokeWidth: 2,
        stroke: "#61B7CF",
        joinstyle: "round",
        outlineStroke: "white",
        outlineWidth: 2
      },
      // .. and this is the hover style.
      connectorHoverStyle = {
        strokeWidth: 3,
        stroke: "#216477",
        outlineWidth: 5,
        outlineStroke: "white"
      },
      endpointHoverStyle = {
        fill: "#216477",
        stroke: "#216477"
      },
      // the definition of source endpoints (the small blue ones)
      sourceEndpoint = {
        endpoint: "Dot",
        paintStyle: {
          stroke: "#7AB02C",
          fill: "transparent",
          radius: 7,
          strokeWidth: 1
        },
        isSource: true,
        connector: ["Flowchart", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true }],
        connectorStyle: connectorPaintStyle,
        hoverPaintStyle: endpointHoverStyle,
        connectorHoverStyle: connectorHoverStyle,
        dragOptions: {},
        overlays: [
          ["Arrow", {
            location: [0.5, 1.5],
            Arrow: "Drag",
            cssClass: "endpointSourceLabel",
            visible: false
          }]
        ]
      },
      // the definition of target endpoints (will appear when the user drags a connection)
      targetEndpoint = {
        endpoint: "Dot",
        paintStyle: { fill: "#7AB02C", radius: 7 },
        hoverPaintStyle: endpointHoverStyle,
        maxConnections: -1,
        dropOptions: { hoverClass: "hover", activeClass: "active" },
        isTarget: true,
        overlays: [
          ["Label", { location: [0.5, -0.5], label: "Drop", cssClass: "endpointTargetLabel", visible: false }]
        ]
      },
      init = function (connection) {
        connection.getOverlay("label").setLabel(connection.sourceId.substring(15) + "-" + connection.targetId.substring(15));
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
      _addEndpoints("Window4", ["TopCenter", "BottomCenter"], ["LeftMiddle", "RightMiddle"]);
      _addEndpoints("Window2", ["LeftMiddle", "BottomCenter"], ["TopCenter", "RightMiddle"]);
      _addEndpoints("Window3", ["RightMiddle", "BottomCenter"], ["LeftMiddle", "TopCenter"]);
      _addEndpoints("Window1", ["LeftMiddle", "RightMiddle"], ["TopCenter", "BottomCenter"]);

      // listen for new connections; initialise them the same way we initialise the connections at startup.
      instance.bind("connection", function (connInfo, originalEvent) {
        init(connInfo.connection);
      });

      // make all the window divs draggable
      instance.draggable(jsPlumb.getSelector(".flowchart-demo .window"), { grid: [20, 20] });
      // THIS DEMO ONLY USES getSelector FOR CONVENIENCE. Use your library's appropriate selector
      // method, or document.querySelectorAll:
      //jsPlumb.draggable(document.querySelectorAll(".window"), { grid: [20, 20] });

      // connect a few up
      instance.connect({ uuids: ["Window1RightMiddle", "Window2LeftMiddle"], editable: true });
      instance.connect({ uuids: ["Window2RightMiddle", "Window3LeftMiddle"], editable: true });
      instance.connect({ uuids: ["Window3RightMiddle", "Window4LeftMiddle"], editable: true });

        instance.connect({ uuids: ["Window5RightMiddle", "Window6LeftMiddle"], editable: true });
        instance.connect({ uuids: ["Window6RightMiddle", "Window7LeftMiddle"], editable: true });
        instance.connect({ uuids: ["Window7RightMiddle", "Window8LeftMiddle"], editable: true });
      // listen for clicks on connections, and offer to delete connections on click.
      //
      instance.bind("click", function (conn, originalEvent) {
        // if (confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?"))
        //   instance.detach(conn);
        conn.toggleType("basic");
      });

      instance.bind("connectionDrag", function (connection) {
        console.log("connection " + connection.id + " is being dragged. suspendedElement is ", connection.suspendedElement, " of type ", connection.suspendedElementType);
      });

      instance.bind("connectionDragStop", function (connection) {
        console.log("connection " + connection.id + " was dragged");
      });

      instance.bind("connectionMoved", function (params) {
        console.log("connection " + params.connection.id + " was moved");
      });
    });

    jsPlumb.fire("jsPlumbDemoLoaded", instance);
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
  handleOkMiddle(): void {
    console.log('click ok');
    this.isVisibleMiddle = false;
    this.isVisibleMiddle1 = false;
  }

  handleCancelMiddle(): void {

    console.log('click Cancel');
    this.isVisibleMiddle = false;
    this.isVisibleMiddle1 = false;
  }

  showModalEditMiddle(): void {
    this.isVisibleEditMiddle = true;
  }
  handleOkEditMiddle(): void {
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
      name: '流程模板',
      describe: '',
      template: '',
      roe: '',
    }];
    console.log(this.dataSet);
    this.updateEditCache();
  }


  abdeRow(){
    console.log(1);
    this.isVisibleMiddle1=true;
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

}
