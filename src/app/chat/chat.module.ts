import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ChatButtonComponent } from './chat-button/chat-button.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    ChatComponent,
    ChatWindowComponent,
    ChatButtonComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule
  ],
  exports: [
    ChatComponent
  ]
})
export class ChatModule { }
