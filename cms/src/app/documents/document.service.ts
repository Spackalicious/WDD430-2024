import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})

export class DocumentService {
  documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>;

  constructor() {
    this.documents = MOCKDOCUMENTS;
   }

   getDocuments() {
    return this.documents.slice();
   }

   getDocument(id: string): Document {
    let documents = this.getDocuments();
    for (let document of documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
   }
}
