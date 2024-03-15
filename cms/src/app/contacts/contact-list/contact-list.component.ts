import { Component, OnInit, OnDestroy, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

// MARCH 9 2024
// @Injectable({
//   providedIn: 'root'
// })
// 
@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit, OnDestroy {
  contactsList: Contact[] = []; 
  subscription: Subscription;
  term: string;

  constructor(private contactService: ContactService

  ) {}

  search(value: string) {
    this.term = value;
  }

  ngOnInit() {
    // this.contactsList = this.contactService.getContacts();
    this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent
      .subscribe(
        (contacts: Contact[]) => {
          this.contactsList = contacts;
        }
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
