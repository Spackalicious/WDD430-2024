import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root'
})

export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>;
  documentListChangedEvent  = new Subject<Document[]>();

  private documents: Document[] = [];
  private maxDocumentId: number = 0;  
  url = 'http://localhost:3000/documents';

  constructor(private http: HttpClient,
    // private router: Router    
    ) {
    // this.maxDocumentId = this.getMaxId();    
   }

   ngOnInit() {
    this.getDocuments();
   }

  getDocuments(): void {
    this.http.get(this.url)
    .subscribe({
      next: (documentData: {message: string, documents: Document[]}) => {    
          this.documents = documentData.documents;
          this.sortAndSend(this.documents);
         
          let documentListClone: Document[] = this.documents.slice();
          this.documentListChangedEvent.next(documentListClone);
      },
      error: (error) => {
        console.log('getDocuments error '+error)
      }
    });
  }


  getDocument(index: number): Document {
  // getDocument(id: string): Document {
    return this.documents[index];
    // return this.documents.find((d) => d.id === id);
    // Mar 23 - not worrying about calling by id, just sticking with index, because this project is already taking too long.
  }

//   getMaxId(): number {
//     let maxId = 0;
//     this.documents.forEach((d) => {
//       if (+d.id > maxId) maxId = +d.id;
//     });
//     console.log('New Documents MaxId is ' + maxId);
//     return maxId;
// }

sortAndSend(thing: any) {
  thing.sort((a, b) => {
    const nameA = a.name.toUpperCase(); 
    const nameB = b.name.toUpperCase(); 
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }      
    return 0;
  });
}

  // storeDocuments() {
  //   const docText = JSON.stringify(this.documents);
  //   const headers = new HttpHeaders() 
  //     .set('content-type', 'application/json');
  //   this.http.put(this.url, docText, { headers }).subscribe(response => {
  //     this.documentListChangedEvent.next(this.documents.slice());
  //     console.log("Documents Updated Successfully");
  //   })
  // }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }
    newDocument.id = '';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    // add to database
    this.http.post<{ 
      message: string, 
      document: Document 
    }>(this.url, newDocument,
    { headers: headers })
    .subscribe(
      (responseData) => {
            // add new document to documents
        // this.sortAndSend(this.documents); **I'm already sorting when I retrieve documents.
        this.documents.push(responseData.document);
      }
    );
    location.assign('http://localhost:4200/documents'); // immediately add new document - bit of a hack.
      // this.router.navigate(['documents']); //doesn't reload with the new document.
    // the old way to add new documents: 
    // this.documents.push(newDocument);
    // this.storeDocuments();
  }
  
  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    } 
    const pos = this.documents.findIndex(d => d.id === originalDocument.id);
    // console.log("The POS is: " + pos);
    // console.log(originalDocument.id);
    // const pos = this.documents.indexOf(originalDocument);
    if ( pos < 0 ) {
      return;
    } 
    newDocument.id = originalDocument.id;
    // newDocument._id = originalDocument._id;
    // this.documents[pos] = newDocument;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    // update database
    // console.log(this.url + "/" + originalDocument.id);
    this.http.put(this.url  + "/" + originalDocument.id,
      newDocument, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.documents[pos] = newDocument;
          // this.sortAndSend(); //don't need this here - I sort and send on get.
        }
      );
      // location.assign('http://localhost:4200/documents'); 
      location.assign('http://localhost:4200/documents'); // immediately display the updated document - bit of a hack.

    // replacing documentListchangedEvent with storeDocuments() **OLD METHOD
    // this.storeDocuments();
  }

  deleteDocument(document: Document) {
    if (!document) {
       return;
    }
    const pos = this.documents.indexOf(document);
    console.log("the POS to be deleted is: " + pos);
    if (pos < 0) {
       return;
    }
    // this.documents.splice(pos, 1);
    this.http.delete(this.url + "/" + document.id)
      .subscribe(
        (response: Response) => {
          this.documents.splice(pos, 1);
          // this.sortAndSend();
        }
      );

      // location.assign('http://localhost:4200/documents'); 
      location.assign('http://localhost:4200/documents'); // immediately display the updated document - bit of a hack

    // unused at week 11, but too bad because this felt cleaner! maybe later reconfigure to use an array that then gets saved.
    // this.storeDocuments();
  }
}
