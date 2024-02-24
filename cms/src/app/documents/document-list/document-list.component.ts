import { Component, Output, EventEmitter, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';


@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit {
  // @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [];  

  constructor(private documentService: DocumentService, 
              // private router: Router, 
              // private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
    this.documentService.documentChangedEvent
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
        }
      );
  }

  // onSelectedDocument(document: Document) {
  //   // this.selectedDocumentEvent.emit(document);
  //   this.documentService.documentSelectedEvent.emit(document);
  // }


}
