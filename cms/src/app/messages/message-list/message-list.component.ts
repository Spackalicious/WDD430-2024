import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { ContactService } from '../../contacts/contact.service';
// import { Contact } from '../../contacts/contact.model';
// import { Subscription } from 'rxjs';

// NEEDED TO IMPORT CONTACTSERVICE HERE IN ADDITION TO MESSAGE ITEM COMPONENT IN ORDER FOR MESSAGES TO LOAD IMMEDIATELY. OTHERWISE, MESSAGES ONLY LOADED AFTER I REDIRECTED TO CONTACTS AND THEN BACK TO MESSAGES. EVEN WITH THIS, THE FIRST TWO MESSAGES' NAMES DO NOT LOAD UNTIL AFTER GOING TO ANOTHER COMPONENT AND COMING BACK. LINES 4(IMPORT CONTACTSERVICE), 22 (PRIVATE CONTACTSERVICE: CONTACTSERVICE), AND 28 (THIS.CONTACTSERVICE.GETCONTACTS();) ARE ADDED. 

// @Injectable()
// MARCH 9 2024 
// @Injectable({
//   providedIn: 'root'
// })
// 
@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
// export class MessageListComponent implements OnInit, OnDestroy {
export class MessageListComponent implements OnInit {
   messages: Message[] = [];
  //  messages: Message[];
  //  subscription: Subscription;
  // subscriptionMessageError: Subscription = new Subscription();
  // subscriptionContactError: Subscription = new Subscription();
  // subscriptionMessageChanges: Subscription = new Subscription();
  // subscriptionContactChanges: Subscription = new Subscription();

  constructor(private messageService: MessageService
              , private contactService: ContactService
              // , private contact: Contact
    ) { }

  ngOnInit() {
    // this.messages = this.messageService.getMessages();
    this.messageService.getMessages(); // David didn't use this one! Mar 9 2024
    this.contactService.getContacts();
    // this.contact.

// David's suggestions for subscriptions, Mar 9 2024
    // this.subscriptionContactChanges = this.contactService.contactListChangedEvent.subscribe(
    //   (contacts: Contact[]) => {
    //     console.log('message-list brought in contacts');
    //     this.messageService.getMessages();
    //   }
    // )

    // // this one did not seem to change anything.
    // this.subscriptionMessageChanges = this.messageService.messageListChangedEvent.subscribe(
    //   (updatedMessages: Message[]) => {
    //     console.log('message-list brought in messages');
    //     this.messages = updatedMessages;
    //   }
    // )

    // this needs an error method to be set up in contactService, which I have not done.
    // this.subscriptionContactError = this.contactService.cont

// END DAVID'S SUGGESTIONS MAR 9 2024


    // this.subscription = this.messageService.messageChangedEvent
    // this.subscription = this.messageService.messageListChangedEvent
    this.messageService.messageListChangedEvent
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
        }
      );
  } 

  // add a message to the message list
  // document-list.component.ts doesn't have this method in there! 
  onAddMessage(message: Message) {
    this.messages.push(message);
  }

  // ngOnDestroy(): void {
    // this.subscription.unsubscribe();
    // this.subscriptionMessageError.unsubscribe();
    // this.subscriptionContactError.unsubscribe();
  //   this.subscriptionMessageChanges.unsubscribe();
  //   this.subscriptionContactChanges.unsubscribe();
  // }

}
