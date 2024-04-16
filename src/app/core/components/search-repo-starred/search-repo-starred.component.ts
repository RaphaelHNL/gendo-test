import { Component, Input, OnInit } from '@angular/core';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-search-repo-starred',
  templateUrl: './search-repo-starred.component.html',
  styleUrls: ['./search-repo-starred.component.scss']
})
export class SearchRepoStarredComponent {
  @Input() repositoriesOrStarred: any;
  @Input() showStarOrLanguage: boolean = true;
  @Input() showErrorToken: boolean = false;
  @Input() showErrorUser: boolean = false;
  starredReposFiltered: any = [];

  constructor(private githubService: GithubService) {
  }

  ngOnChanges() {
    this.starredReposFiltered = this.repositoriesOrStarred;
  }


  filter(event: any) {
    const textSearch = event.target.value.trim().toLowerCase();
    if (event.code === 'Enter') {
      textSearch === '' ? this.starredReposFiltered = this.repositoriesOrStarred : this.starredReposFiltered = this.repositoriesOrStarred.filter((starred: any) => starred.name.toLowerCase().includes(textSearch))
    }
  }


}
