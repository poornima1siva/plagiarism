import { Component  } from '@angular/core';
import { DocumentService } from '../document.service';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Route,Router } from '@angular/router';
@Component({
  selector: 'app-displaydocument',
  imports: [HttpClientModule,SidebarComponent],
  templateUrl: './displaydocument.component.html',
  styleUrl: './displaydocument.component.css'
})
export class DisplaydocumentComponent {
  documents: any[] = [];
  errorMessage: string = '';
  uploadedDocuments: any[] = [];
  uploadMessage = '';
  plagiarismResults: { name: string; similarity: number }[] = [];

  constructor(private http:HttpClient) {}

  ngOnInit(): void {
    this.fetchUploadedDocuments();
    
  }

  fetchUploadedDocuments() {
    this.http.get<any[]>('http://localhost:4091/documents').subscribe({
      next: (data) => {
        this.uploadedDocuments = data;
        console.log('📄 Fetched documents:', data); // Debugging log
      },
      error: (err) => {
        console.error('Error fetching documents:', err);
      }
    });
  }
  
 
  }
  

