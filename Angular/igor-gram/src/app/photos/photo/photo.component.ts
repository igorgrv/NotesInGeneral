import { Component, OnInit, Input } from '@angular/core';

const API = 'http://localhost:3000/imgs/'

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css'],
})
export class PhotoComponent implements OnInit {
  private _url: string = '';
  @Input() description: string;
  @Input() set url(url: string) {
    if (!url.startsWith('data')) {
      this._url = API + url;
    } else {
      this._url = url;
    }
  }

  get url() {
    return this._url;
  }

  constructor() {}

  ngOnInit(): void {}
}
