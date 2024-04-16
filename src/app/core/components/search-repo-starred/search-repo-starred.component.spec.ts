import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchRepoStarredComponent } from './search-repo-starred.component';
import { HttpClientModule } from '@angular/common/http';

fdescribe('SearchRepoStarredComponent', () => {
  let component: SearchRepoStarredComponent;
  let fixture: ComponentFixture<SearchRepoStarredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchRepoStarredComponent ],
      imports: [HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchRepoStarredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve setar starredReposFiltered com o valor do repositoriesOrStarred no ngOnChanges', () => {
    const testData = [{ name: 'Repo1' }, { name: 'Repo2' }];

    component.repositoriesOrStarred = testData;
    component.ngOnChanges();

    expect(component.starredReposFiltered).toEqual(testData);
  });

  it('deve filtrar repositoriesOrStarred com base na pesquisa de texto feito na função filter', () => {
    component.repositoriesOrStarred = [
      { name: 'Repo1' },
      { name: 'Repo2' },
      { name: 'AnotherRepo' }
    ];
    const event = {
      target: { value: 'repo' },
      code: 'Enter'
    };
    component.filter(event);

  });

});
