import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

// @Injectable()
@Injectable({
  providedIn: 'root'
})

export class DocumentService {
  private documents: Document[] = [];
  private maxDocumentId: number = 0;

  documentSelectedEvent = new EventEmitter<Document>;
  // documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent  = new Subject<Document[]>();
  

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
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

  getMaxId(): number {
    let maxId = 0;
    // // for each document in the documents list
    // let allDocs = this.getDocuments();
    // for (let doc of allDocs) {
    //   // currentId = convert document.id into a number
    //   // if needed, use JS parseInt() to convert from string to a number. 
    //   let currentDocId = +doc.id;
    //   //     if currentId > maxId then
    //   if (currentDocId > maxId) {
    //   //         maxId = currentId
    //     maxId = currentDocId; 
    //     // console.log('New maxId = ' + maxId);
    //   }  // endIf 
    // } // endFor
    // console.log('New Documents maxId = ' + maxId);
    // return maxId
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
    newDocument.id = String(this.maxDocumentId++);
    // push newDocument onto the documents list
    this.documents.push(newDocument);
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
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
    const documentsListClone = this.documents.slice();
    // documentListChangedEvent.next(documentsListClone)
    this.documentListChangedEvent.next(documentsListClone);
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
    const documentsListClone = this.documents.slice();
    // this.documentChangedEvent.emit(this.documents.slice());
    this.documentListChangedEvent.next(documentsListClone);
  }
}
