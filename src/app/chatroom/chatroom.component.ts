import { Component, Input, OnInit } from '@angular/core';
import { SignalRService } from '../signalr.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})

export class ChatroomComponent implements OnInit {

  messagebox = new FormGroup({
    message: new FormControl('', [Validators.required]),
  });

  messages: { user: string, message: string, date?: Date }[] = [];
  userList: string[] = [];
  
  constructor(private signalRService: SignalRService) {}

  ngOnInit(): void {
    this.signalRService.message$.subscribe(msg => {
      this.messages.push(msg);
    });
    this.signalRService.userlist$.subscribe(user => {
      this.userList = user
    })
  }
 
  sendGroupMessage():void 
  {
    this.signalRService.sendGroupMessage(localStorage.getItem("username")!, this.messagebox.getRawValue().message!);
    this.messagebox.reset();
  }

}