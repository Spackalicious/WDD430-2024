import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Document } from '../document.model'; 
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css'
})
export class DocumentEditComponent implements OnInit {
  // @ViewChild('f') slForm: NgForm;
  // I added the ViewChild following the example from the recipe book app.
  // newMessage: string;
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private documentService: DocumentService
  ) { }

  ngOnInit() {
    // this.route.data.subscribe(
    //   (data: Data) => {
    //     this.newMessage = data['message'];
    //   }
    // );
    this.route.params.subscribe (
      (params: Params) => {
        //  id = value of id parameter in params list
        let id = params['id'];
        //  if id parameter is undefined or null then
        if (id === undefined || id === null) {
          //     editMode = false
          this.editMode = false;
          //     return
          return;
        } //  endif
        //  originalDocument = getDocument(id)
        this.originalDocument = this.documentService.getDocument(id);
        //  if originalDocument is undefined or null then
        if ( this.originalDocument === undefined || this.originalDocument === null ) {
          //     return
          return;
        } //  endif
        //  set editMode to true
        this.editMode = true;
        //  document = clone originalDocument
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
    });
  }

  // addDocument() {
  //   this.documentService.addDocument(this.document);
  //   // this.newMessage = "You've successfully <pretended to> add your document!";
  // }

  // updateDocument() {
  //   this.documentService.addDocument(this.document);
  //   // this.newMessage = "You've successfully <pretended to> update your document!";
  // }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit(form: NgForm) {
    // get the values from form's fields
    let value = form.value; 
    // newDocument = new Document()
    let newDocument = new Document(
      // Assign the values in the form fields to corresponding properties in newDocument
      null, value.name, value.description, value.url);
      // if editMode = true, then
      if (this.editMode) {
        // documentService.updateDocument(originalDocument, newDocument)
        this.documentService.updateDocument(this.originalDocument, newDocument);
      } else {
        // else documentService.addDocument(newDocument)
        this.documentService.addDocument(newDocument);
      } // endIf
      // route back to the '/documents' URL 
      this.onCancel();
  }
}
