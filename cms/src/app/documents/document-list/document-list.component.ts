// import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';


@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit, OnDestroy {
  // @Output() selectedDocumentEvent = new EventEmitter<Document>();
  // documents: Document[] = [];  
  documentsList : Document[] = [];  
  subscription: Subscription;

  constructor(private documentService: DocumentService
    // , 
              // private router: Router, 
              // private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    // this.documents = this.documentService.getDocuments();
    // this.documentService.documentChangedEvent
    //   .subscribe(
    //     (documents: Document[]) => {
    //       this.documents = documents;
    //     }
    //   );
    
    this.documentsList  = this.documentService.getDocuments();
    this.subscription = this.documentService.documentListChangedEvent
        .subscribe(
          (documents: Document[]) => {
            this.documentsList = documents;
          }
        );
    }

    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }

  // onSelectedDocument(document: Document) {
  //   // this.selectedDocumentEvent.emit(document);
  //   this.documentService.documentSelectedEvent.emit(document);
  // }


}
