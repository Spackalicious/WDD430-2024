import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
// import { ListFormat } from 'typescript';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[] = [];
  private maxContactId: number = 0;

  contactSelectedEvent = new EventEmitter<Contact>;
  // contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();

  constructor() { 
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  // NOT TOTALLY SURE I DID THIS CORRECTLY!!!
  // getContact(id: string): Contact {
  //   // FOR each contact in the contacts list
  //   let contacts = this.getContacts();
  //   for (let contact of contacts) {
  //     // IF contact.id equals the id THEN
  //     if (contact.id === id) {
  //       // RETURN contact
  //       return contact;
  //     }// ENDIF

  //   } // ENDFOR
  //   // RETURN null
  //   return null;
  // }

  getContact(index: number): Contact {
    return this.contacts[index];
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }
    newContact.id = String(this.maxContactId++);
    this.contacts.push(newContact);
    const contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact ) {
      return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if ( pos < 0 ) {
      return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    const contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    // this.contactChangedEvent.emit(this.contacts.slice());
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  getMaxId(): number {
    let maxId = 0;
    this.contacts.forEach((d) => {
      if (+d.id > maxId) maxId = +d.id;
    })
    console.log('New Contacts maxId = ' + maxId);
    return maxId
}

}
