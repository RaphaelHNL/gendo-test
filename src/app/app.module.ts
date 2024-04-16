import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './core/components/home/home.component';
import { SearchRepoStarredComponent } from './core/components/search-repo-starred/search-repo-starred.component';
import { HttpClientModule } from  '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchRepoStarredComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
