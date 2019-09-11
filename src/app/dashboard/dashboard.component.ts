import { Component, OnInit } from '@angular/core';
//import * as Chartist from 'chartist';
import { DataService } from '../data.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  Tests: number;
  criti: number;
  total: number;
  chart: any;
  Data =[];
  List = [];
  lables = [];
  pass_data =[];
  fail_data =[];

  constructor(private dataservice: DataService) { }
  
  
  ngOnInit() {

    this.tests();
    this.get_count();
  }

  plotchart() {
    this.chart = new Chart('canvas1', {
      type: 'pie',
      data: {
        labels: ['Pass','Fail'],
        datasets: [
          { 
            data:this.Data,
            backgroundColor: ['green','rgba(255, 0, 0, 1)'],
            fill: false
          },
        ]
      },
      options: {
        legend: {
          display: true
        },
        tooltips:{
          enabled: true
        }
      }
    });

    this.chart = new Chart('canvas2',{
      type: 'horizontalBar',
      data: {
         labels: this.lables,
         datasets: [{
            label: "Pass",
            backgroundColor: '#cc3399',
            data:this.pass_data,
         }, {
            label: "Fail",
            backgroundColor: '#0099ff',
            data: this.fail_data,
         }, ]
      },
      options: {
         responsive: true,
         legend: {
            display: true
         },
         scales: {
            
            xAxes: [{
               stacked: true
            }],
            yAxes: [{
              stacked: true
           }]
         },
  
      }
   });
  }

  tests(){
    this.dataservice.gettests()
         .subscribe(count =>{
           var b = count;
           this.Tests= b['tests'];
           for (var i=1;i<=this.Tests;i++){
             this.lables.push(''+i)
           }
         });
         
  }

  get_count(){
    this.dataservice.getCount()
         .subscribe(d =>{
          //console.log(d);
           var b = d;
           this.criti= b['critical'];
           this.total = b['total'];
           this.Data.push(b['pass_tests']);
           this.Data.push(b['fail_tests']);
           this.List=(b['list'])
           for (var j=0;j<this.List.length;j++){
             this.pass_data.push(this.List[j]['pass'])
             this.fail_data.push(this.List[j]['fail'])
             
           }
           console.log(this.pass_data)
           console.log(this.fail_data)
           this.plotchart();
         })
  }

}
