import { Component, Injectable, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';

// MARCH 9 2024
// @Injectable({
//   providedIn: 'root'
// })
// 
@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent implements OnInit {
  selectedContact: Contact;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.contactSelectedEvent
      .subscribe(
        (contact: Contact) => {
          this.selectedContact = contact
        }
      );
  }
}
