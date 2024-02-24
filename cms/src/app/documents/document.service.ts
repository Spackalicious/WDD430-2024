import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable()
// @Injectable({
//   providedIn: 'root'
// })

export class DocumentService {
  documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>;
  documentChangedEvent = new EventEmitter<Document[]>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
   }

   getDocuments() {
    return this.documents.slice();
   }

  //  getDocument(id: string): Document {
  //   let documents = this.getDocuments();
  //   for (let document of documents) {
  //     if (document.id === id) {
  //       return document;
  //     }
  //   }
  //   return null;
  //  }
  getDocument(index: number): Document {
    return this.documents[index];
  }

  deleteDocument(document: Document) {
    if (!document) {
       return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
       return;
    }
    this.documents.splice(pos, 1);
    this.documentChangedEvent.emit(this.documents.slice());
  }
}
