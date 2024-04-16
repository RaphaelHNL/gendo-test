import { Component } from '@angular/core';
import { GithubService } from '../../services/github.service';

export interface users {
  avatar_url: string,
  name: string,
  bio: string
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  user: any = [];
  repositoriesArray: any = [];
  StarredArray: any = [];
  starOrLanguage: boolean = true;
  userGithubSearch = '';
  haveError: boolean = false;
  changeUser = window.sessionStorage.getItem('user');
  constructor(private githubService: GithubService) {
    if (this.changeUser) {
      this.userGithubSearch = this.changeUser;
    } else {
      this.userGithubSearch = 'rogerramosme';
    }
  }

  ngOnInit() {
    this.searchUser()
    this.searchRepository();
    this.searchStarred();

  }

  searchUser() {
    this.githubService.get('users/' + this.userGithubSearch).subscribe((userDesc: any) => {
      this.user = userDesc;
      this.haveError = false;
    },
      (error) => {
        this.haveError = true;
      }
    )
  }


  searchRepository() {
    this.githubService.get(`users/${this.userGithubSearch}/repos`).subscribe((repos: any) => {
      this.repositoriesArray = repos;
      this.haveError = false;
    },
      (error) => {
        this.haveError = true;
      })
  }

  changeTab(tab: string) {
    if (tab === 'repos') {
      this.starOrLanguage = true;
    } else {
      this.starOrLanguage = false;
    }
  }


  searchStarred() {
    this.githubService.get(`users/${this.userGithubSearch}/starred`).subscribe((Starred: any) => {
      this.StarredArray = Starred;
      this.haveError = false;
    },
      (error) => {
        this.haveError = true;
      })
  }




}
