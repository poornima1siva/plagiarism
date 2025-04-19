import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-deleledocument',
  imports: [HttpClientModule,SidebarComponent],
  templateUrl: './deleledocument.component.html',
  styleUrl: './deleledocument.component.css'
})
export class DeleledocumentComponent {
  uploadedDocuments: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUploadedDocuments();
  }

  fetchUploadedDocuments() {
    this.http.get<any[]>('http://localhost:4091/documents').subscribe({
      next: (data) => {
        this.uploadedDocuments = data;
        console.log('📄 Fetched documents:', data);
      },
      error: (err) => {
        console.error('Error fetching documents:', err);
      }
    });
  }

  deleteDocument(id: string | undefined) {
    if (!id) {
      console.error('❌ Document ID is missing!');
      return;
    }

    const confirmation = confirm('Are you sure? Do you want to delete this document?');
    if (!confirmation) {
      console.log('❌ Deletion cancelled by user.');
      return;
    }

    this.http.delete(`http://localhost:4091/documents/${id}`).subscribe({
      next: (response) => {
        console.log('✅ Document deleted successfully:', response);
        this.fetchUploadedDocuments();
      },
      error: (error) => {
        console.error('❌ Error deleting document:', error);
      }
    });
  }
}
