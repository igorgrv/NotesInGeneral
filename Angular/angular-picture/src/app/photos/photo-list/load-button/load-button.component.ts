import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ap-load-button',
  templateUrl: './load-button.component.html',
  styleUrls: ['./load-button.component.css']
})
export class LoadButtonComponent implements OnInit {

  hasmore: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
