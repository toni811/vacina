import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ImpfungDetailsComponent} from './impfung-details/impfung-details.component';
import { ImpfungListComponent } from './impfung-list/impfung-list.component';
import { HomeComponent } from './home/home.component';
import {ImpfungFormComponent} from './impfung-form/impfung-form.component';
import {LoginComponent} from './login/login.component';


// Push
const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'impfung', component: ImpfungListComponent},
    // Delet
    { path: 'impfung/:title', component: ImpfungDetailsComponent },


    ///////////////////////////////
    { path: 'impfung/user/:id', component: ImpfungDetailsComponent },



    //////////////////////////////////////
    //Formular
    { path: 'admin', component: ImpfungFormComponent },
    { path: 'admin/:title', component: ImpfungFormComponent },
    //Login

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
