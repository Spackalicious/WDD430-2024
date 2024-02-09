import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent implements OnInit {
  newMessage: string;

  constructor( private route: ActivatedRoute) {  }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: Data) => {
        this.newMessage = data['message'];
      }
    );
  }
}
