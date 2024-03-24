import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from './message.model';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MessageService implements OnInit {
  messageChangedEvent = new EventEmitter<Message[]>();
  messageListChangedEvent = new Subject<Message[]>();
  
  private messages: Message[] = [];
  private maxMessageId: number = 0;
  url = 'http://localhost:3000/messages';

  constructor(
    private http: HttpClient,
  ) {
    // this.maxMessageId = this.getMaxId();
  }

  ngOnInit() {
    this.getMessages();
  }

  getMessages(): void {
    this.http.get(this.url)
    .subscribe({
      next: (messageData: {message: string, messages: Message[]}) => {
        this.messages = messageData.messages;
        // this.maxMessageId = this.getMaxId();

        let messageListClone: Message[] = this.messages.slice();
        this.messageListChangedEvent.next(messageListClone);
      },
      error: (err) => {
        console.log('getMessages error ' + err);
      }
    })
  }

  getMessage(id: string): Message {
    return this.messages[id];
  }

  // storeMessages() {
  //   const messagesText = JSON.stringify(this.messages);
  //   const headers = new HttpHeaders()
  //     .set('content-type', 'application/json')
  //     .set('FakeHeader', 'fakeTypeToCheckWorking!');
  //   this.http.put(this.url, messagesText, { headers }).subscribe(response => {
  //     this.messageListChangedEvent.next(this.messages.slice());
  //     console.log("Messages Updated in Firebase!");
  //   })
  // }

  addMessage(newMsg: Message) {
    if (!newMsg) {
      return;
    }
    // message.id = String(++this.maxMessageId);
    newMsg.id = ''
    
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    // add to database
    this.http.post<{ 
      message: string, 
      newMessage: Message 
    }>(this.url, newMsg,
    { headers: headers })
    .subscribe(
      (responseData) => {
        console.log(JSON.stringify(responseData.newMessage));
        this.messages.push(responseData.newMessage);
      }
      );
    location.reload();
    
    // this.messages.push(message);
    // this.storeMessages();
  }

  // getMaxId(): number {
  //   let maxId = 0;
  //   this.messages.forEach((n) => {
  //     if (+n.id > maxId) maxId = +n.id;
  //   });
  //   return maxId;
  // }

}
