import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { Contact } from '../contact.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;
  // isGroup: boolean = false;

  constructor( private route: ActivatedRoute, 
                private router: Router,
                private contactService: ContactService
  ) {  }

  ngOnInit(): void {
    this.route.params.subscribe (
      (params: Params) => {
        let id = params['id'];
        if (!id) {
          this.editMode = false;
          return;
        }
        this.originalContact = this.contactService.getContact(id);
        if (!this.originalContact) {
          return;
        }
        this.editMode = true;
        this.contact = JSON.parse(JSON.stringify(this.originalContact));
        if (this.groupContacts) {
          this.groupContacts = JSON.parse(JSON.stringify(this.groupContacts));
        }
      }
    );
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit(form: NgForm) {
    let value = form.value; 
    let newContact = new Contact(
      null, value.name, value.email, value.phone, value.imageUrl, this.groupContacts);
    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    } this.onCancel();
  }

  onDrop(event: CdkDragDrop<Contact[]>) {
    if (event.previousContainer !== event.container) {
    const contactCopy = { ...event.item.data };
    // if (this.groupContacts.length > 1) {
      this.groupContacts.push(contactCopy);
      console.log(event);
      this.onDropSuccess();
      // this.isGroup = true;
    // }    
    }
  }

  onDropSuccess() {
    console.log("Right now, just saying congrats on dropping");
  }

  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if (invalidGroupContact) {
      return;
    }
    this.groupContacts.push(selectedContact);
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length ) {
      return;
    }
    this.groupContacts.splice(index, 1);
  }

  isInvalidContact(newContact: Contact) {
    if(!newContact) {
      return true;
    }
    if (this.contact && newContact.id === this.contact.id) {
      return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }
    return false;
  }

}
