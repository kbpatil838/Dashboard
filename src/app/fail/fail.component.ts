import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {Location} from '@angular/common';



@Component({
  selector: 'app-fail',
  templateUrl: './fail.component.html',
  styleUrls: ['./fail.component.scss']
})
export class FailComponent implements OnInit {

  fail_tests = [];

  constructor(private dataservice: DataService,private _location: Location) { }

  ngOnInit() {
    this.failtests()
  }

  backClicked() {
    this._location.back();
  }
  
  failtests() {
    this.dataservice.tests()
         .subscribe(count =>{
           var b = count;
           console.log(b)
           for (let i=0;i<b.length;i++){
            var fail = b[i]['fail_tests'];
            for (let i=0; i < fail.length;i++){
              fail[i].uname = fail[i]['@name']
              fail[i].tstart = fail[i]['status']["@starttime"];
              fail[i].tend = fail[i]['status']["@endtime"];
              fail[i].tcritical = fail[i]['status']["@critical"];
              this.fail_tests.push(fail[i]);
            }
           }
          
          });
  }



}
