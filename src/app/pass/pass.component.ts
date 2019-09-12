import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-pass',
  templateUrl: './pass.component.html',
  styleUrls: ['./pass.component.scss']
})
export class PassComponent implements OnInit {

  pass_tests = [];

  constructor(private dataservice: DataService,private _location: Location) { }

  ngOnInit() {
    this.passtests()
  }

  backClicked() {
    this._location.back();
  }

  passtests() {
    this.dataservice.tests()
         .subscribe(count =>{
           var b = count;
           console.log(b)
           for (let i=0;i<b.length;i++){
            var pass = b[i]['pass_tests'];
            for (let i=0; i < pass.length;i++){
              pass[i].uname = pass[i]['@name']
              pass[i].tstart = pass[i]['status']["@starttime"];
              pass[i].tend = pass[i]['status']["@endtime"];
              pass[i].tcritical = pass[i]['status']["@critical"];
              this.pass_tests.push(pass[i]);
              
            }
            
           }
           
          });
        }
}
