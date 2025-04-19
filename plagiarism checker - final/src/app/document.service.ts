import { Injectable } from '@angular/core';
import { HttpClient , HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class DocumentService {
  private apiUrl = 'http://localhost:3000/documents';

  constructor(private http: HttpClient) {}

  // Get all documents
  getDocuments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Update a document by ID
  updateDocument(id: string, updateData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, updateData);
  }

  // Delete a document by ID
  deleteDocument(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getAllDocuments(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  checkPlagiarism(content: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { content });
 
 }


 private resultSource = new BehaviorSubject<any>(null);
  result$ = this.resultSource.asObservable();

  setResult(result: any) {
    this.resultSource.next(result);
  }
}
