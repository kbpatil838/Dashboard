import { Component, OnInit } from '@angular/core';
//import { Router } from '@angular/router'
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
  
  

  constructor( private dataservice: DataService) { }
  
  
  ngOnInit() {

    this.tests();
    this.get_count();
    
  }

  
  plotchart() {
    
    this.chart = new Chart('canvas1', {
      type: 'pie',
      data: {
        labels: ['pass','Fail'],
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
          display: false
        },
        onClick:function(e){
          var activePoints = this.chart.getElementsAtEvent(e);
          var selectedIndex = activePoints[0]._index;
          this.name = this.data.labels[selectedIndex];
          console.log(this.data.datasets[0].data[selectedIndex],this.data.labels[selectedIndex]);
          if (this.data.labels[selectedIndex] == "Fail"){
            location.href = '/#/fail_tests';
          }
          else {
            location.href = '/#/pass_tests';
          }
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
            display: false
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
           setTimeout(() => {
            this.plotchart();
           }, 100)
           
         })
  }

  // canvas = document.getElementById('canvas1');
  // myChart = new Chart(this.canvas, this.chart);

  // canvas.onclick = function(evt) { alert("hello world");
  //    var activePoint = this.myChart.getElementAtEvent(evt)[0];
  //    var data = activePoint._chart.data;
  //    var datasetIndex = activePoint._datasetIndex;
  //    var label = data.datasets[datasetIndex].label;
  //    var value = data.datasets[datasetIndex].data[activePoint._index];
  //    console.log(label, value);
  // };
  
}

