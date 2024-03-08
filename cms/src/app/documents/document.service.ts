import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Document } from './document.model';
// import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

// @Injectable()
@Injectable({
  providedIn: 'root'
})

export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>;
  documentListChangedEvent  = new Subject<Document[]>();

  private documents: Document[] = [];
  private maxDocumentId: number = 0;  
  // private error = null;
  url = 'https://wdd430-opendb-default-rtdb.firebaseio.com/documents.json';

  constructor(private http: HttpClient) {
    // this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();    
   }

   ngOnInit() {
    this.getDocuments();
   }

   getDocuments() {
    // return this.documents.slice();      
    return this.http.get<Document[]>(this.url)
    .subscribe // this subscribe is unhappy because I'm passing a 2nd argument, the error, as instructed.
      // success method 
      (response => {
      // (documents: Document[] ) => {
      //   this.documents = documents;
      this.documents = Object.values(response);
      //   this.maxDocumentId = this.getMaxId();
      this.maxDocumentId = this.getMaxId();
      console.log(this.documents);
      // sort the list of documents
      this.documents.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // names must be equal
        return 0;
      });

      // emit the next document list change event.
      this.documentListChangedEvent.next(this.documents.slice());
      // error method
    }, error => {
      // this.error = error.message;
      // console.log(error);
      console.log(error.message);
    })    
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

  storeDocuments() {
    const docText = JSON.stringify(this.documents);
    const headers = new HttpHeaders() 
      .set('content-type', 'application/json');
    this.http.put(this.url, docText).subscribe(response => {
      this.documentListChangedEvent.next(this.documents.slice());
      console.log("Documents Updated Successfully");
    })
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

    // replacing documentListchangedEvent with storeDocuments()
    // this.documentListChangedEvent.next(this.documents.slice());
    this.storeDocuments();
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


    // replacing documentListchangedEvent with storeDocuments()
    // this.documentListChangedEvent.next(this.documents.slice());
    this.storeDocuments();
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


    // replacing documentListchangedEvent with storeDocuments()
    // this.documentListChangedEvent.next(this.documents.slice());
    this.storeDocuments();
  }
}
