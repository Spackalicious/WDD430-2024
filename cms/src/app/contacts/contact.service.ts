import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { ListFormat } from 'typescript';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>;

  constructor() { 
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  // NOT TOTALLY SURE I DID THIS CORRECTLY!!!
  getContact(id: string): Contact {
    // FOR each contact in the contacts list
    let contacts = this.getContacts();
    for (let contact of contacts) {
      // IF contact.id equals the id THEN
      if (contact.id === id) {
        // RETURN contact
        return contact;
      }// ENDIF

    } // ENDFOR
    // RETURN null
    return null;
  }


}
