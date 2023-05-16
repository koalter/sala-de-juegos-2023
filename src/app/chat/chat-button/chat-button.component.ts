import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'chat-button',
  templateUrl: './chat-button.component.html',
  styleUrls: ['./chat-button.component.scss']
})
export class ChatButtonComponent {
  @Input() alerta!: boolean;
}
