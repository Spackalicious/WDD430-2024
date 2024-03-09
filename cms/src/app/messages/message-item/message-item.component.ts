import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from '../../contacts/contact.service';
import { Contact } from '../../contacts/contact.model';
import { MessageService } from '../message.service';

// MARCH 9 2024
// @Injectable({
//   providedIn: 'root'
// })
// 
@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css'
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: string = "";

  constructor(
    private contactService: ContactService
    , private messageService: MessageService
  ) {}

  ngOnInit() {
    // const contact: Contact = this.contactService.getContact(+this.message.sender);
    const contact: Contact = this.contactService.getContact(this.message.sender);
    // const message: Message = this.messageService.getMessage(this.message.id);
    this.messageSender = contact.name;
    // this.messageSender = 
    // this.messageSender = 'Contact Number ' + this.message.sender;

  }
}
