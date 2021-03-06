import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-load-button',
  templateUrl: './load-button.component.html',
})
export class LoadButtonComponent implements OnInit {
  @Input() hasPhotos: boolean;

  constructor() {}

  ngOnInit(): void {}
}
