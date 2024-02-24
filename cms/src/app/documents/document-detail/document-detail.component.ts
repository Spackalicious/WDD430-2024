import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { WindRefService } from '../../wind-ref.service';


@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css'
})
export class DocumentDetailComponent implements OnInit {
  // @Input() document: Document;
  document: Document;
  id: number;
  nativeWindow: any;

  constructor(private documentService: DocumentService, 
              private route: ActivatedRoute, 
              private router: Router, 
              private windowRefService: WindRefService
  ) { }

  ngOnInit() {
    this.route.params 
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.document = this.documentService.getDocument(this.id);
        }
      )

    this.nativeWindow = this.windowRefService.getNativeWindow();
  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    // route back to the '/documents' URL
    this.router.navigate(['documents']);
 }
}
