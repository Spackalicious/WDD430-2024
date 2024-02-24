// import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';


@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit, OnDestroy {
  contactsList: Contact[] = []; 
  subscription: Subscription;

  // @Output() selectedContactEvent = new EventEmitter<Contact>();

  constructor(private contactService: ContactService
    // , 
              // private router: Router, 
              // private route: ActivatedRoute    
  ) {}

  ngOnInit() {
    this.contactsList = this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent
      .subscribe(
        (contacts: Contact[]) => {
          this.contactsList = contacts;
        }
      );
  }
  //   this.contactService.contactChangedEvent
  //     .subscribe(
  //       (contacts: Contact[]) => {
  //         this.contacts = contacts;
  //       }
  //     )
  // }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // onSelected(contact: Contact) {
  //   // this.selectedContactEvent.emit(contact);
  //   this.contactService.contactSelectedEvent.emit(contact);
  // }

  // onNewContact() {
  //   this.router.navigate(['new'], {relativeTo: this.route });
  // }
}
