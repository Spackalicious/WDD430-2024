import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from '../../contacts/contact.service';
import { Contact } from '../../contacts/contact.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css'
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: string = "";
  msgSender: string = "";

  constructor(
    private contactService: ContactService
    , private messageService: MessageService
  ) {}

  ngOnInit() {
    const contact: Contact = this.contactService.getContact(this.message.sender);
    this.messageSender = contact.name;

    // this.msgSender = JSON.stringify(contact);
    // console.log("MSGSENDER INFO: " + this.msgSender);
  }
}
