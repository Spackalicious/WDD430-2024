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
    // }    
    }
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length ) {
      return;
    }
    this.groupContacts.splice(index, 1);
  }

}
