import { Component, Injectable, Input } from '@angular/core';
import { Contact } from '../contact.model';

// MARCH 9 2024
// @Injectable({
//   providedIn: 'root'
// })
// 
@Component({
  selector: 'cms-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrl: './contact-item.component.css'
})
export class ContactItemComponent {
  @Input() contact: Contact;
  @Input() index: number;


}
