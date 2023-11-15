import { Component, OnInit } from '@angular/core';
import { Booking } from '../services/booking.model';
import { BookingService } from '../services/booking.service';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-analytics-report',
  templateUrl: './analytics-report.component.html',
  styleUrls: ['./analytics-report.component.css']
})

export class AnalyticsReportComponent implements OnInit{
  bookings: Booking[] = []

  barChart = new Chart(
    {
      chart: {type: 'column'},
      title: {text: 'Product Report'},
      credits: {enabled: false},
      xAxis: {
        categories: ['Sunset Cruise in Langkawi', 'Pulau Payar Snorkeling Tour', 'Wildlife Park Ticket']
      },
      yAxis: {
        title: {text: 'Number of Pax'}
      },
      series: [
        {
          name: ['Number of Sell Product'],
          data:[107, 32, 15]
        } as any
        
      ]
    }
  )

  constructor(public bookingService: BookingService){

  }

  ngOnInit(): void {
    this.bookings = this.bookingService.getAllBooking();
  }
}
