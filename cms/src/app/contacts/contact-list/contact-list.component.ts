import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit {
  // contacts: Contact[] = [
  //   new Contact("1", "R. Kent Jackson", "jacksonk@byui.edu", "208-496-3771", "../../../assets/images/jacksonk.jpg", null)
  //   ,new Contact("2", "Rex Barzee", "barzeer@byui.edu", "208-496-3768", "../../../assets/images/barzeer.jpg", null)
  // ]; 
  contacts: Contact[] = []; 

  // @Output() selectedContactEvent = new EventEmitter<Contact>();

  constructor(private contactService: ContactService, 
              private router: Router, 
              private route: ActivatedRoute    
  ) {}

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    this.contactService.contactChangedEvent
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
        }
      )
  }

  // onSelected(contact: Contact) {
  //   // this.selectedContactEvent.emit(contact);
  //   this.contactService.contactSelectedEvent.emit(contact);
  // }

  onNewContact() {
    this.router.navigate(['new'], {relativeTo: this.route });
  }
}
