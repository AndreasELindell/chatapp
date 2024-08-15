import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {


  private hubConnection: signalR.HubConnection;
  private messageSubject = new Subject<{ user: string, message: string, date?: Date }>();
  private userListSubject = new Subject<string[]>();

  message$ = this.messageSubject.asObservable();
  userlist$ = this.userListSubject.asObservable();


  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:7181/chat-hub`)
      .build();
      this.hubConnection.start().catch(err => console.error('Error while starting connection: ' + err));

      this.hubConnection.on('ReceiveMessage', (user: string, message: string, date?: Date) => {
        this.messageSubject.next({ user, message, date });
      });
  
      this.hubConnection.on('UpdateUsersList', (user: string[]) => {
        this.userListSubject.next(user);
      });
  }
  

  
  sendGroupMessage(username: string, message: string) {
    this.hubConnection.invoke('SendGroupMessage', username, message)
      .catch(err => console.error('Error while sending message: ' + err));
  }
  JoinGroupChat(username: string, chatroom: string) {
    this.hubConnection.invoke('JoinGroupChat', username, chatroom)
  }
  
  
}
