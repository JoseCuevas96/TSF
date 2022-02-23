import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  constructor() { }

  ngOnInit() {
  }
  
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'This field is required';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
