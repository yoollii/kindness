import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { HttpService } from '../../http/http.service';
@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.less']
})
export class ButtonsComponent implements OnInit {
  size = 'large';
  arr = [];
  constructor(private http:HttpService) { }

  ngOnInit() {
    
  }
  getInfor() {
    const value = {     
      "baseUrl": "string",
      "crtime": "2018-08-31T07:16:00.573Z",
      "des": "hello",
      "id": "123",
      "modelId": "modelId1",
      "name": "admin",
      "state": 0,
      "useFlag": 0
    }
    this.http.httpmender('/applicationsystem/addAppli', value).subscribe(data => {console.log(data);});
  }
  showInfor() {
    this.http.httpmender('/applicationsystem/findList', {}).subscribe(
      data => {
        if (data.result === '0000') {
          this.arr = data.data.data;
          console.log(this.arr);
       }
      }
    )
  }
  delete(id:string){
    this.http.httpmenderdel('/applicationsystem/delAppliById?id=' + id).subscribe(data => {
      if (data.result === '0000') {
        
     }
    })
  }
  edit(value: any){
    value.modelId = "modelId2",
    value.name = "Hreey",
    console.log(value);
    value = JSON.stringify(value);
    this.http.httpmenderput('/applicationsystem/updateAppli', value).subscribe(data => {
      
    })
  }
}
