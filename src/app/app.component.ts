import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ecommerace';
  public gifts: [] = [];

  constructor() {
    // @ts-ignore
    this.gifts.push({
      id: '1',
      name: 'Gift 1',
      price: '100',
    });
  }

  ngOnInit(): void {
    this.generateRandomOTP();
    this.findObjectByKey(this.gifts, 'id', '1');
  }

  generateRandomOTP() {
    // min number 6 digits, max number 7 digits - 1000000
    return Math.floor(100000 + Math.random() * 900000);
  }

  findObjectByKey(array: string[], key, value: string) {
    for (let i = 0; i < array.length; i++) {
      if (array[i][key] === value) {
        console.log(array[i]);
        return array[i];
      }
    }
    return null;
  }
}
