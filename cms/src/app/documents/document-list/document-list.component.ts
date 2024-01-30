import { Component, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document('1', 'docNameOne', 'docDescriptionOne', 'www.docURL-one', null),
    new Document('2', 'docName2', 'docDescription2', 'www.docURL-2', null),
    new Document('3', 'docName3', 'docDescription3', 'www.docURL-3', null),
    new Document('1', 'docName4', 'docDescription4', 'www.docURL-4', null),
    new Document('2', 'docName5', 'docDescription5', 'www.docURL-5', null),
    new Document('3', 'docName6', 'docDescription6', 'www.docURL-6', null)
  ];  

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }


}
