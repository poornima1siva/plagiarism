import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isSidebarOpen = false;

    sidebarLinks = [
      { label: "Upload Document", route: "/uploaddocument", icon: "fas fa-upload" },
      { label: "Display Documents", route: "/displaydocument", icon: "fas fa-file-alt" },
      { label: "Check Plagiarism", route: "/checkplagiarism", icon: "fas fa-search" },
      { label: "Create Account", route: "/createaccount", icon: "fas fa-user-plus" },
      { label: "Delete", route: "/deletedocument", icon: "fas fa-sign-out-alt" }
    ];
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    }
  }
  

