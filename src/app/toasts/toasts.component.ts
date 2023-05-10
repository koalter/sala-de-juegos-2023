import { Component } from '@angular/core';
import { ToastService } from './shared/toast.service';
import { ToastInfo } from './shared/toast-info.model';
import { faWarning } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss']
})
export class ToastsComponent {

  faWarning = faWarning;

  get toasts() {
    return this.toastService.toasts;
  }

  constructor(private toastService: ToastService) { }

  remover(toast: ToastInfo) {
    this.toastService.remover(toast);
  }
}
