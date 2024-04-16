import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/search-repo-starred', pathMatch: 'full' },
  { path: 'search-repo-starred', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
