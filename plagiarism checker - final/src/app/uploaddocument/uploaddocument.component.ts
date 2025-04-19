import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
@Component({
  selector: 'app-uploaddocument',
  imports: [HttpClientModule,SidebarComponent],
  templateUrl: './uploaddocument.component.html',
  styleUrl: './uploaddocument.component.css'
})
export class UploaddocumentComponent {
  selectedFile: File | null = null;
  selectedGoogleFile: string | null = null;
  fileName: string = ''; 
  uploadSource: string = 'local'; // Default upload source
  isUploading = false;
  uploadMessage = '';
  uploadedDocuments: any[] = []; // Store uploaded document list
  showPopup = false; // ✅ Added for the popup

  constructor(private http: HttpClient, private router:Router) {}

  // Set upload source (local or Google Classroom)
  setUploadSource(source: string) {
    this.uploadSource = source;
    this.selectedFile = null;
    this.selectedGoogleFile = null;
    this.fileName = '';
  }

  // Handle file selection from local storage
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.fileName = this.selectedFile.name;
      console.log('Selected Local File:', this.fileName);
    }
  }

  // Simulate Google Classroom file selection
  connectToGoogleClassroom() {
    
  window.location.href = 'https://classroom.google.com/c/NzUzMjEzNTQ2Mzg5';
  }
  

  // Upload Document (Handles both Local & Google Classroom)
  uploadDocument(event: Event) {
    event.preventDefault();
    
    if (!this.selectedFile) {
      this.uploadMessage = 'Please select a file first!';
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile!); // ✅ Ensure it matches the backend's field name

    this.isUploading = true;
    this.uploadMessage = '';

    this.http.post('http://localhost:4091/documents', formData).subscribe({
      next: (res: any) => {
        this.uploadMessage = 'File uploaded successfully!';
        this.isUploading = false;
        console.log('Upload Response:', res);
        this.showPopup = true; 
      },
      error: (err) => {
        console.error('Upload error:', err);
        this.uploadMessage = 'File upload failed. Please try again!';
        this.isUploading = false;
      }
    });
}
fetchUploadedDocuments() {
  this.http.get<any[]>('http://localhost:3000/documents').subscribe({
    next: (data) => {
      this.uploadedDocuments = data;
    },
    error: (err) => {
      console.error('Error fetching documents:', err);
    }
  });
}

// Delete a document
deleteDocument(documentId: string) {
  this.http.delete(`http://localhost:3000/documents/${documentId}`).subscribe({
    next: () => {
      this.uploadedDocuments = this.uploadedDocuments.filter(doc => doc.id !== documentId);
    },
    error: (err) => {
      console.error('Error deleting document:', err);
    }
  });
}
closePopup() {
  this.showPopup = false; // ✅ Hide popup when closed
}



}
