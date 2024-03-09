import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from './message.model';
import { Subject } from 'rxjs';
// import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService implements OnInit {
  messageChangedEvent = new EventEmitter<Message[]>();
  
  // gonna try this cuz nothing is working.
  messageListChangedEvent = new Subject<Message[]>();
  // end new trying. now to add it below. Mar 8 2024
  
  private messages: Message[] = [];
  private maxMessageId: number = 0;
  url = 'https://wdd430-opendb-default-rtdb.firebaseio.com/messages.json';

  constructor(
    private http: HttpClient
  ) {
    // this.messages = MOCKMESSAGES;
    this.maxMessageId = this.getMaxId();
  }

  ngOnInit() {
    this.getMessages();
  }

  getMessages() {
    // return this.messages.slice();
    return this.http.get<Message[]>(this.url)
      .subscribe  
        (response => {
          this.messages = Object.values(response);
          this.maxMessageId = this.getMaxId();
          console.log("Messages: ");
          console.log(this.messages);
          // this.messageChangedEvent.emit(this.messages.slice());
          this.messageListChangedEvent.next(this.messages.slice());
        }, error => {
          console.log(error.message);
        })
  }

  // getMessage(id: string): Message {
  //   // let messages = this.getMessages();
  //   // for (let message of messages) {
  //   //   if (message.id === id) {
  //   //     return message;
  //   //   }
  //   //   return null;
  //   // }    
  //   return this.messages[id];
  // }
  // getMessage(id: number): Message {
  //   // let messages = this.getMessages();
  //   // for (let message of messages) {
  //   //   if (message.id === id) {
  //   //     return message;
  //   //   }
  //   //   return null;
  //   // }    
  //   return this.messages[id];
  // }

  getMessage(id: string): Message {
    return this.messages[id];
  }

  storeMessages() {
    const messagesText = JSON.stringify(this.messages);
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('FakeHeader', 'fakeTypeToCheckWorking!');
    this.http.put(this.url, messagesText, { headers }).subscribe(response => {
      this.messageListChangedEvent.next(this.messages.slice());
      // this.messageChangedEvent.emit(this.messages.slice());
      console.log("Messages Updated in Firebase!");
    })
  }

  addMessage(message: Message) {
    if (!message) {
      return;
    }
    // console.log('The current message maxId is: ' + this.maxMessageId);
    message.id = String(++this.maxMessageId);
    // console.log('new message MaxId is: ' + message.id);
    this.messages.push(message);
    // this.messageChangedEvent .emit(this.messages.slice());
    this.storeMessages();
  }

  getMaxId(): number {
    let maxId = 0;
    this.messages.forEach((n) => {
      if (+n.id > maxId) maxId = +n.id;
    });
    // console.log('New Messages maxId = ' + maxId);
    return maxId;
  }

}
