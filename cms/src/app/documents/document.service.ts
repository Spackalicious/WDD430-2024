import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

// @Injectable()
@Injectable({
  providedIn: 'root'
})

export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>;
  documentListChangedEvent  = new Subject<Document[]>();

  private documents: Document[] = [];
  private maxDocumentId: number = 0;  

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
   }

   getDocuments() {
    return this.documents.slice();
   }

  getDocument(index: number): Document {
    return this.documents[index];
  }

  getMaxId(): number {
    let maxId = 0;
    this.documents.forEach((d) => {
      if (+d.id > maxId) maxId = +d.id;
    });
    console.log('New Documents simpler retrieval method MaxId is ' + maxId);
    return maxId;
}

  addDocument(newDocument: Document) {
    // if newDocument is undefined or null then
    if (!newDocument) {
    // return
      return;
    }
    // endIf
    console.log('The current MaxID is: ' + this.maxDocumentId);
    newDocument.id = String(this.maxDocumentId++);
    console.log('The new MaxID is: ' + this.maxDocumentId);
    // push newDocument onto the documents list
    this.documents.push(newDocument);
    // const documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentsListClone);
    this.documentListChangedEvent.next(this.documents.slice());
  }
  
  updateDocument(originalDocument: Document, newDocument: Document) {
    // if originalDocument or newDocument is undefined or null then
    if (!originalDocument || !newDocument) {
      // return
      return;
    } // endIf

    // pos = documents.indexOf(originalDocument)
    const pos = this.documents.indexOf(originalDocument);
    // if pos < 0 then
    if ( pos < 0 ) {
      // return
      return;
    } // endIf
    // newDocument.id = originalDocument.id
    // newDocument.id = String(originalDocument.id);
    newDocument.id = originalDocument.id;
    // documents[pos] = newDocument
    this.documents[pos] = newDocument;
    // documentsListClone = documents.slice()
    // const documentsListClone = this.documents.slice();
    // documentListChangedEvent.next(documentsListClone)
    // this.documentListChangedEvent.next(documentsListClone);
    this.documentListChangedEvent.next(this.documents.slice());
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
    // Does it matter if we use the variable? Using documentsListClone just in case it matters later. 
    // const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(this.documents.slice());
    // this.documentListChangedEvent.next(documentsListClone);
  }
}
