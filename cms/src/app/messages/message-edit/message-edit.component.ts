import { Component, Output, EventEmitter, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent implements OnInit {
  // Create a string variable named currentSender and initialize with value of own name
  // currentSender: string = 'Julie Spackman';
  currentSender: string = '0';
  
  // CUSTOM EVENTEMITTER TO OUTPUT NEW MESSAGE OBJECT UP TO THE MESSAGELIST COMPONENT
  @Output() addMessageEvent = new EventEmitter<Message>();

  // We need the values entered in the subject and msgText input elements from teh DOM.
  // Use the @ViewChild property decorator to create an ElementRef for the subject and msgText input elements in the Dom.
  @ViewChild('subject') subjectInputRef: ElementRef;
  @ViewChild('msgText') msgTextInputRef: ElementRef;  
  // @ViewChild('subject', {static: true}) subjectInputRef: ElementRef;
  // @ViewChild('msgText', {static: true}) msgTextInputRef: ElementRef;  

  constructor(private messageService: MessageService) { }

  ngOnInit(): void { }

  onSendMessage() {
    // Get the value stored in the subject input element
    const subjectValue = this.subjectInputRef.nativeElement.value;
    // Get the value stored in the msgText
    const msgTextValue = this.msgTextInputRef.nativeElement.value;
    // assign a hardcoded number to the id property of the new Message Object
    const newMessage = new Message('1', subjectValue, msgTextValue, this.currentSender);
    // Call the addMessageEvent emitter's emit() method and pass it the new Message
    // this.addMessageEvent.emit(newMessage);
    
    // new way: call the service to add message!
    this.messageService.addMessage(newMessage);
  }

  onClear() {
    // assign a blank value to the subject and msgText input elements in the form.
    this.subjectInputRef.nativeElement.value = '';
    this.msgTextInputRef.nativeElement.value = '';
  }
}
