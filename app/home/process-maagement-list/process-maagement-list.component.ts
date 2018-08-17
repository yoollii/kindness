import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-process-maagement-list',
  templateUrl: './process-maagement-list.component.html',
  styleUrls: ['./process-maagement-list.component.less']
})
export class ProcessMaagementListComponent implements OnInit {
  jsplmdIs:boolean=true;
  constructor() { }

  ngOnInit() {
    // let iframe=$("#iframe1");
    // let _this=this;
    // iframe.onload = function(){
    //   alert("iframe load  done");
    // };
  }

}
