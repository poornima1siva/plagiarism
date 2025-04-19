import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ResultComponent } from '../result/result.component';
import { UploaddocumentComponent } from '../uploaddocument/uploaddocument.component';
import { DisplaydocumentComponent } from '../displaydocument/displaydocument.component';
import { CheckplagiarismComponent } from '../checkplagiarism/checkplagiarism.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
