import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as $ from 'jquery';
@Component({
  selector: 'app-process-maagement-list',
  templateUrl: './process-maagement-list.component.html',
  styleUrls: ['./process-maagement-list.component.less']
})
export class ProcessMaagementListComponent implements OnInit {
  jsplmdIs = true;
  id: string;
  key: string;
  url: string;
  src: string;
  type: string;
  iframe: SafeResourceUrl;
  constructor(public router: Router, public activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer ) {
    this.activatedRoute.queryParams.subscribe(Params => {
      // this.parmlen = Object.keys(Params).length;
      this.key = Params['key'];
      this.url = Params['url'];
      this.type = Params['type'];
      this.id = Params['modelId'];
      // this.src = 'http://192.168.1.252:8099/model/create?name=' + this.name + '&key=' + this.key + '&description=' + this.description;
      // tslint:disable-next-line:max-line-length
      if (this.type === 'add') {
        // tslint:disable-next-line:max-line-length
        this.src = 'http://hjj.ngrok.michaelch.xyz/' + this.url;
      } else if (this.type === 'edit') {
        this.src = 'http://hjj.ngrok.michaelch.xyz/modeler.html?modelId=' + this.id + '&key=' + this.key;
      }
      this.iframe = this.sanitizer.bypassSecurityTrustResourceUrl(this.src);
    });
   }
  gorouter(item: any) {
    this.router.navigateByUrl(item);
  }
  ngOnInit() {
    // let iframe=$("#iframe1");
    // let _this=this;
    // iframe.onload = function(){
    //   alert("iframe load  done");
    // };
  }

}
