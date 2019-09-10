import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
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
    this.chart = new Chart('canvas1', {
      type: 'pie',
      data: {
        labels: ['Pass','Fail'],
        datasets: [
          { 
            data:this.Data,//[2,9],
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
         })
  }

}



// startAnimationForBarChart(chart){
  //     let seq2: any, delays2: any, durations2: any;

  //     seq2 = 0;
  //     delays2 = 80;
  //     durations2 = 500;
  //     chart.on('draw', function(data) {
  //       if(data.type === 'bar'){
  //           seq2++;
  //           data.element.animate({
  //             opacity: {
  //               begin: seq2 * delays2,
  //               dur: durations2,
  //               from: 0,
  //               to: 1,
  //               easing: 'ease'
  //             }
  //           });
  //       }
  //     });

  //     seq2 = 0;
  // };

  //var datawebsiteViewsChart = {
    //   labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    //   series: [
    //     [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

    //   ]
    // };
    // var optionswebsiteViewsChart = {
    //     axisX: {
    //         showGrid: false
    //     },
    //     low: 0,
    //     high: 1000,
    //     chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
    // };
    // var responsiveOptions: any[] = [
    //   ['screen and (max-width: 640px)', {
    //     seriesBarDistance: 5,
    //     axisX: {
    //       labelInterpolationFnc: function (value) {
    //         return value[0];
    //       }
    //     }
    //   }]
    // ];
    // var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

    // //start animation for the Emails Subscription Chart
    // this.startAnimationForBarChart(websiteViewsChart);