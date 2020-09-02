import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @Output() onTyping = new EventEmitter<string>();
  debounce: Subject<string> = new Subject<string>();
  constructor() {}

  ngOnInit(): void {
    this.debounce
      .pipe(debounceTime(300))
      .subscribe((filter) => this.onTyping.emit(filter));
  }
}
