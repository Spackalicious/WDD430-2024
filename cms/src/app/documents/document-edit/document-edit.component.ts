import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { DocumentService } from '../document.service';
import { Document } from '../document.model'; 

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css'
})
export class DocumentEditComponent implements OnInit {
  newMessage: string;
  document: Document;

  constructor(private route: ActivatedRoute,
              private documentService: DocumentService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.newMessage = data['message'];
      }
    );
  }

  addDocument() {
    this.documentService.addDocument(this.document);
    this.newMessage = "You've successfully <pretended to> add your document!";
  }

  updateDocument() {
    this.documentService.addDocument(this.document);
    this.newMessage = "You've successfully <pretended to> update your document!";
  }
}
