import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
// import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService implements OnInit {
  contactSelectedEvent = new EventEmitter<Contact>;
  contactListChangedEvent = new Subject<Contact[]>();

  private contacts: Contact[] = [];
  private maxContactId: number = 0;
  url = 'https://wdd430-opendb-default-rtdb.firebaseio.com/contacts.json';

  constructor(private http: HttpClient) { 
    // this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxConId();
  }

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    // return this.contacts.slice();
    return this.http.get<Contact[]>(this.url)
      .subscribe 
        (response => {
          this.contacts = Object.values(response);
          this.maxContactId = this.getMaxConId();
          console.log("Contacts: ");
          console.log(this.contacts);
          this.contactListChangedEvent.next(this.contacts.slice());
        }, error => {
          console.log(error.message);
        });

  }

  // getContact(index: number): Contact {
  //   return this.contacts[index];
  // }
  getContact(index: string): Contact {
    return this.contacts[index];
  }

  getMaxConId(): number {
    let maxConId = 0;
    this.contacts.forEach((n) => {
      if (+n.id > maxConId) maxConId = +n.id;
    });
    console.log('New Contacts maxConId = ' + maxConId);
    return maxConId;
  }

  storeContacts() {
    const contactsText = JSON.stringify(this.contacts);
    const headers = new HttpHeaders()
      .set('content-type', 'application/json');
    this.http.put(this.url, contactsText, { headers }).subscribe(response => {
      this.contactListChangedEvent.next(this.contacts.slice());
      console.log("Contacts Updated!");
    })
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }
    // console.log('The current contact MaxId is: ' + this.maxContactId);
    newContact.id = String(++this.maxContactId);
    // console.log('The new contact MaxID is: ' + newContact.id);
    this.contacts.push(newContact);
    // const contactsListClone = this.contacts.slice();
    // this.contactListChangedEvent.next(contactsListClone);

    // this.contactListChangedEvent.next(this.contacts.slice());
    this.storeContacts();
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
    // const contactsListClone = this.contacts.slice();
    // this.contactListChangedEvent.next(contactsListClone);

    // this.contactListChangedEvent.next(this.contacts.slice());
    this.storeContacts();
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
    // this.contactListChangedEvent.next(this.contacts.slice());
    this.storeContacts();
  }

  

}
