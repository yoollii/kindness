import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less']
})
export class HomePageComponent implements OnInit {
  private hide: Boolean = false;
  constructor() {}
  gridStyle = {
    width: '100%',
    textAlign: 'center',
    color: 'red',
  };
  ngOnInit() {
    // this.init();
  }
}
