import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  loading = false;
  tabs = [];
  name: string;
  constructor(public router: Router, public activatedRoute: ActivatedRoute, public local: LocalStorageService) {
    // this.activatedRoute.queryParams.subscribe(Params => {
    //   // this.parmlen = Object.keys(Params).length;
    //   this.name = Params['name'];
    // });
    this.name = this.local.get('name');
   }
  ngOnInit() { }
  isCollapsed = false;
  triggerTemplate = null;
  @ViewChild('trigger') customTrigger: TemplateRef<void>;
  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }
  logout() {
    //  this.tokenService.clear();
    this.router.navigateByUrl('login');
  }

  gorouter(item: any) {
    // 	if(this.tabs.indexOf(item.split('/')[1])==-1){
    // 		this.tabs.push(item.split('/')[1]);
    this.router.navigateByUrl(item);
    // 	}else{
    // 		this.router.navigateByUrl(item);
    // 	}
  }
  reviem(item: string) {
    this.router.navigateByUrl('home/' + item);
  }
  closeTab(tab: string): void {
    this.tabs.splice(this.tabs.indexOf(tab), 1);
  }

  change() {
    setTimeout(() => (this.loading = false), 500);
  }
}
