import { Component, OnInit } from '@angular/core';
// import * as $ from 'jquery';
declare var $: any;
import { weartherurl, HttpService } from '../../http/http.service';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.less']
})
export class ButtonsComponent implements OnInit {
  size = 'large';
  city = 'CHSH000000';
  key = '35e0273f7d3d4f8fb4ce6011b603ba69';
  constructor(private http: HttpService) { }

  ngOnInit() {
    // console.log(weartherurl);
    // tslint:disable-next-line:max-line-length
    // this.http.httpweatherget('https://free-api.heweather.com/s6/weather/now?location=北京&key=35e0273f7d3d4f8fb4ce6011b603ba69').subscribe(data => {
    //   console. log(data);
    // });
    $.ajax({
      url: 'https://free-api.heweather.com/s6/weather/forecast?location=成都&key=35e0273f7d3d4f8fb4ce6011b603ba69',
      type: 'get',
      success: function (data) {
        console.log(data);
      }
    });
  }
}
