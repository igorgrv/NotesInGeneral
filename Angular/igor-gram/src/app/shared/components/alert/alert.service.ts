import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Alert } from './alert';
import { AlertType } from './alert';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alertSubect: Subject<Alert> = new Subject<Alert>();

  private alert(alertType: AlertType, message: string) {
    this.alertSubect.next(new Alert(alertType, message));
  }

  getAlert() {
    return this.alertSubect.asObservable();
  }

  success(message: string) {
    this.alert(AlertType.SUCCESS, message);
  }

  warning(message: string) {
    this.alert(AlertType.WARNING, message);
  }

  danger(message: string) {
    this.alert(AlertType.DANGER, message);
  }

  info(message: string) {
    this.alert(AlertType.INFO, message);
  }
}
