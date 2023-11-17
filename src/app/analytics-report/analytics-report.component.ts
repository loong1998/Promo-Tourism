import { Component, OnInit, ViewChild } from '@angular/core';
import { Booking } from '../services/booking.model';
import { BookingService } from '../services/booking.service';
import { Subscription } from "rxjs";
import { AuthService } from '../services/auth.service';
import { User } from '../services/user.model';
import { UserService } from '../services/user.service';


import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexTooltip,
  ApexXAxis,
  ApexLegend,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexYAxis
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  markers: any; //ApexMarkers;
  stroke: any; //ApexStroke;
  yaxis: ApexYAxis | ApexYAxis[];
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  fill: ApexFill;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-analytics-report',
  templateUrl: './analytics-report.component.html',
  styleUrls: ['./analytics-report.component.css']
})

export class AnalyticsReportComponent implements OnInit{
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(public bookingService: BookingService, public authService: AuthService
    , private userService: UserService) {
    this.chartOptions = {
      series: [
        {
          name: "Total Product Sold",
          type: "column",
          data: [0]
        },
        {
          name: "Cashflow",
          type: "column",
          data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5]
        }
      ],
      chart: {
        height: 350,
        type: "line",
        stacked: false
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [1, 1, 4]
      },
      title: {
        text: "Analysis Report",
        align: "left",
        offsetX: 110
      },
      xaxis: {
        categories: ['Jan']
      },
      yaxis: [
        {
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: "#008FFB"
          },
          labels: {
            style: {
              // color: "#008FFB"
            }
          },
          title: {
            text: "Total Sales of Product (RM)",
            style: {
              color: "#008FFB"
            }
          },
          tooltip: {
            enabled: true
          }
        },
        {
          seriesName: "Income",
          opposite: true,
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: "#00E396"
          },
          labels: {
            style: {
              // color: "#00E396"
            }
          },
          title: {
            text: "Number of Customer",
            style: {
              color: "#00E396"
            }
          }
        }
      ],
      tooltip: {
        fixed: {
          enabled: true,
          position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60
        }
      },
      legend: {
        horizontalAlign: "left",
        offsetX: 40
      }
    };
  }

  reports: Booking[] = [];
  public reportSub: Subscription | undefined;
  loginUser;
  loginUserType;
  userTypeSubscription: Subscription;

  account: User[] = [];
  accountSub: Subscription | undefined;

  ngOnInit(): void {
    this.loginUser = this.authService.getUsername();
    this.userTypeSubscription = this.authService.getUserType().subscribe((userType: string) => {
      this.loginUserType = userType;
    });
    console.log(this.loginUser);
    console.log(this.loginUserType);

    if(this.loginUserType === 'merchant'){
      this.bookingService.getBookingForReport(this.loginUser);
      this.reportSub = this.bookingService.getBookingForReportListener()
            .subscribe(
              (reports: Booking[]) => {
                this.reports = reports;
                
                let totalSales = 0;
                let totalNumOfPax = 0;
                reports.forEach((reportData) => {
                  totalSales += reportData.totalPrice;
                  totalNumOfPax += reportData.numOfPax;
                })

                console.log(totalSales);
                this.chartOptions.series = [
                  {
                  name: 'Total Sales',
                  data: [totalSales],
                  type: 'bar'
                  }
                  ,
                  {
                    name: 'Total Number of Customer',
                    data: [totalNumOfPax],
                    type: 'column'
                  }
                ];
              }
            );
    }
    else if(this.loginUserType === 'officer'){
      this.bookingService.getBookings();
      this.reportSub = this.bookingService.getBookingUpdateListener()
            .subscribe(
              (reports: Booking[]) => {
                this.reports = reports;
                
                let totalSales = 0;
                let totalNumOfPax = 0;
                reports.forEach((reportData) => {
                  totalSales += reportData.totalPrice;
                  totalNumOfPax += reportData.numOfPax;
                })

                console.log(totalSales);
                this.chartOptions.series = [
                  {
                  name: 'Total Sales',
                  data: [totalSales],
                  type: 'bar'
                  }
                  ,
                  {
                    name: 'Total Number of Customer',
                    data: [totalNumOfPax],
                    type: 'column'
                  }
                ];

                this.chartOptions.title = 
                  {
                    text: 'Analysis Report for All Merchant'
                  }
                
              }
            );
      
    }
    
  }
}
