import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

// MARCH 9 2024
// @Injectable({
//   providedIn: 'root'
// })
// 
@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css'
})
export class ContactDetailComponent implements OnInit {
  contact: Contact;
  // id: number;
  id: string;

  constructor(private contactService: ContactService, 
              private route: ActivatedRoute,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          // this.id = +params['id'];
          this.id = params['id'];
          this.contact = this.contactService.getContact(this.id);
        }
      );
  }

  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.router.navigateByUrl('contacts');
  }

}
