import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { ContactService } from '../contact.service';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent implements OnInit {
  newMessage: string;
  contact: Contact;

  constructor( private route: ActivatedRoute, 
                private contactService: ContactService
  ) {  }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: Data) => {
        this.newMessage = data['message'];
      }
    );
  }

  addContact() {
    this.contactService.addContact(this.contact);
    this.newMessage = "You've successfully {pretended to} add your contact!";
  }

  updateContact() {
    this.contactService.addContact(this.contact);
    this.newMessage = "You've successfully {pretended to} update your contact!";
  }
}
