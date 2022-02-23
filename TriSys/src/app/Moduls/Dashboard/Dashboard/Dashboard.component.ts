import { Component, OnInit } from '@angular/core';

export interface SystemNews {
  date: string;
  message: string;
}

const ELEMENT_DATA: SystemNews[] = [
  {date: '09/24/2021', message: 'We have resolved a bug within class types'},
  {date: '09/24/2021', message: 'We have added the invoices panel'},
  {date: '09/24/2021', message: 'Welcome for the first time!'},
];

@Component({
  selector: 'app-Dashboard',
  templateUrl: './Dashboard.component.html',
  styleUrls: ['./Dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['date', 'message'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit() {
  }

}
