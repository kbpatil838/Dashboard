import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  
  
  pass_tests = [];
  fail_tests = [];


  constructor(private dataservice: DataService) { }

  ngOnInit() {
    this.gettests()
    
  }

  gettests() {
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
            var fail = b[i]['fail_tests'];
            for (let i=0; i < fail.length;i++){
              fail[i].uname = fail[i]['@name']
              fail[i].tstart = fail[i]['status']["@starttime"];
              fail[i].tend = fail[i]['status']["@endtime"];
              fail[i].tcritical = fail[i]['status']["@critical"];
              this.fail_tests.push(fail[i]);
            }
           }
           console.log(pass) 
          });
  }

}
