import { Component, OnInit , inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Route,Router } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
@Component({
  selector: 'app-checkplagiarism',
  imports: [CommonModule,HttpClientModule,SidebarComponent],
  templateUrl: './checkplagiarism.component.html',
  styleUrl: './checkplagiarism.component.css'
})
export class CheckplagiarismComponent {
 documentContent: string = "";
  results: any[] = [];
  errorMessage: string = '';
  uploadedDocuments: any[] = [];
  uploadMessage = '';
  plagiarismResults: { comparison: string; similarity: number }[] = [];

  constructor(private http:HttpClient , private router:Router) {}

  checkPlagiarism(documentId: string, documentName: string) {
    console.log('🔍 Checking plagiarism for document ID:', documentId);
  
    if (!documentId) {
      console.error('❌ Document ID is missing!');
      return;
    }
  
    this.http.post<any>('http://localhost:4091/check-plagiarism', { documentId }).subscribe({
      next: (response) => {
        console.log('✅ Plagiarism check results:', response);
  
        if (!response || !response.similarities) {
          console.error('❌ No similarities data found in response!');
          return;
        }
  
        // Extract relevant data
        const plagiarismResults = response.similarities.map((item: any) => ({
          comparison: item.comparison,
          similarity: item.similarity,
          id: item.id || null  // Ensure `id` exists to prevent undefined error
        }));
  
        console.log("📊 Sending data to ResultComponent:", plagiarismResults);
  
        // Navigate to ResultComponent and pass data
        this.router.navigate(['/result'], {
          state: { 
            plagiarismResults, 
            documentName // doc1 name
          }
        });
      },
      error: (error) => {
        console.error('❌ Error checking plagiarism:', error);
      },
    });
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
  ngOnInit(): void {
    this.fetchUploadedDocuments();
    
  }

}