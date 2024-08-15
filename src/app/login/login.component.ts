import { Component } from '@angular/core';
import { SignalRService } from '../signalr.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  profileForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    chatroom: new FormControl('', [Validators.required]),
  });

  constructor(private signalRService: SignalRService, private router: Router) {}

  onSubmit(): void
  {

    

    let userinfo = this.profileForm.getRawValue();
    this.setUserinfo(userinfo.username!, userinfo.chatroom!)

    this.signalRService.JoinGroupChat(userinfo.username!, userinfo.chatroom!);
    this.router.navigateByUrl("/chatroom");
  }

  setUserinfo(username: string, chatroom: string): void {
    localStorage.setItem("chatroom", chatroom)
    localStorage.setItem("username", username)
  }
}
