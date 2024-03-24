import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService implements OnInit {
  contactSelectedEvent = new EventEmitter<Contact>;
  contactListChangedEvent = new Subject<Contact[]>();

  private contacts: Contact[] = [];
  private maxContactId: number = 0;
  url = 'http://localhost:3000/contacts';

  constructor(private http: HttpClient) { 
    // this.maxContactId = this.getMaxConId();
  }

  ngOnInit() {
    this.getContacts();
  }

  getContacts(): void {
    this.http.get(this.url)
    .subscribe({
      next: (ContactData: {message: string, contacts: Contact[]}) => {    
          this.contacts = ContactData.contacts;
          // this.maxContactId = this.getMaxConId();
          this.sortAndSend(this.contacts);
         
          let contactListClone: Contact[] = this.contacts.slice();
          this.contactListChangedEvent.next(contactListClone);
          // this.maxContactId = this.getMaxConId();
      },
      error: (error) => {
        console.log('getContacts error ' + error);
      }
    });
  }

  getContact(index: string): Contact {
    return this.contacts[index];
  }

  // getMaxConId(): number {
  //   let maxConId = 0;
  //   this.contacts.forEach((n) => {
  //     if (+n.id > maxConId) maxConId = +n.id;
  //   });
  //   // console.log('New Contacts maxConId = ' + maxConId);
  //   return maxConId;
  // }

  sortAndSend(thing: any) {
    thing.sort((a, b) => {
      const nameA = a.name.toUpperCase(); 
      const nameB = b.name.toUpperCase(); 
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }      
      return 0;
    });
  }

  // storeContacts() {
  //   const contactsText = JSON.stringify(this.contacts);
  //   const headers = new HttpHeaders()
  //     .set('content-type', 'application/json');
  //   this.http.put(this.url, contactsText, { headers }).subscribe(response => {
  //     this.contactListChangedEvent.next(this.contacts.slice());
  //     console.log("Contacts Updated!");
  //   })
  // }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }
    
    newContact.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.post<{ 
      message: string, 
      contact: Contact 
    }>(this.url, newContact,
    { headers: headers })
    .subscribe(
      (responseData) => {
        this.contacts.push(responseData.contact);
      }
    );
    location.assign('http://localhost:4200/contacts');

    // this.contacts.push(newContact);
    // this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact ) {
      return;
    }
    // const pos = this.contacts.indexOf(originalContact);
    const pos = this.contacts.findIndex(d => d.id === originalContact.id);
    if ( pos < 0 ) {
      return;
    }
    newContact.id = originalContact.id;
    // this.contacts[pos] = newContact;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    // update database
    this.http.put(this.url  + "/" + originalContact.id,
    newContact, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.contacts[pos] = newContact;
          // this.sortAndSend(); //don't need this here - I sort and send on get.
        }
      );
      // location.assign('http://localhost:4200/contacts');     
      location.assign('http://localhost:4200/contacts');     
    // this.storeContacts();
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    // this.contacts.splice(pos, 1);
    this.http.delete(this.url + "/" + contact.id)
    .subscribe(
      (response: Response) => {
        this.contacts.splice(pos, 1);
        // this.sortAndSend();
      }
    );
    // location.assign('http://localhost:4200/contacts');
    location.assign('http://localhost:4200/contacts');
    // this.storeContacts();
  }  

}
