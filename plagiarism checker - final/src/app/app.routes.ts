import { Routes } from '@angular/router';
import { CreateaccountComponent } from './createaccount/createaccount.component';
import { LoginComponent } from './login/login.component';
import { UploaddocumentComponent } from './uploaddocument/uploaddocument.component';
import { DisplaydocumentComponent } from './displaydocument/displaydocument.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CheckplagiarismComponent } from './checkplagiarism/checkplagiarism.component';
import { ResultComponent } from './result/result.component';
import { HomeComponent } from './home/home.component';
import { DeleledocumentComponent } from './deleledocument/deleledocument.component';

export const routes: Routes = [

    {
        path:'createaccount', component:CreateaccountComponent
    },
    {
        path:'', component:LoginComponent
    },
    {
        path:'uploaddocument', component:UploaddocumentComponent
    },
    {
        path:'displaydocument',component:DisplaydocumentComponent
    },
    {
        path:'sidebar', component:SidebarComponent
    },
    {
        path:'checkplagiarism' , component:CheckplagiarismComponent
    },
    {
        path:'result' , component:ResultComponent
    },
    {
        path:'home', component:HomeComponent
    },
    {
        path:'deletedocument', component:DeleledocumentComponent
    }
];
