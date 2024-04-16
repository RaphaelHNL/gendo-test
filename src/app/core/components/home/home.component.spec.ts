import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { GithubService } from '../../services/github.service';
import { of, throwError } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

fdescribe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockGithubService: jasmine.SpyObj<GithubService>;

  beforeEach(waitForAsync(() => {
    mockGithubService = jasmine.createSpyObj('GithubService', ['get']);

    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientModule],
      providers: [{ provide: GithubService, useValue: mockGithubService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });


  it('deve iniciar as funções no ngOnInit', () => {
    spyOn(component, 'searchUser');
    spyOn(component, 'searchRepository');
    spyOn(component, 'searchStarred');

    component.ngOnInit();

    expect(component.searchUser).toHaveBeenCalled();
    expect(component.searchRepository).toHaveBeenCalled();
    expect(component.searchStarred).toHaveBeenCalled();
  });
  it('Deve chamar a api searchUser', () => {
    const userData = { name: 'testUser', avatar_url: 'testAvatar', bio: 'testBio' };
    mockGithubService.get.and.returnValue(of(userData));
    component.userGithubSearch = 'testUser';

    component.searchUser();
    expect(mockGithubService.get).toHaveBeenCalledWith('users/testUser');
  });

  it('deve setar a variavel user com o resultado da função searchUser', () => {

    const userData = { name: 'testUser', avatar_url: 'testAvatar', bio: 'testBio' };
    mockGithubService.get.and.returnValue(of(userData));

    component.searchUser();

    expect(component.user).toEqual(userData);
  });


  it('deve setar haveError como true se ocorrer um erro na chamada da api do user', () => {
    const error = new Error('Error fetching users');
    mockGithubService.get.and.returnValue(throwError(error));

    component.searchUser();

    expect(component.haveError).toBeTruthy();
  });


  it('deve chamar a função searchRepository', () => {
    const repoData = [{ name: 'Repo1' }, { name: 'Repo2' }];
    mockGithubService.get.and.returnValue(of(repoData));

    component.searchRepository();

    expect(mockGithubService.get).toHaveBeenCalledWith(`users/${component.userGithubSearch}/repos`);
  });

  it('deve setar a variavel repositoriesArray com o resultado da função searchRepository', () => {
    const repoData = [{ name: 'Repo1' }, { name: 'Repo2' }];
    mockGithubService.get.and.returnValue(of(repoData));

    component.searchRepository();

    expect(component.repositoriesArray).toEqual(repoData);
  });


  it('deve setar haveError como true se ocorrer um erro na chamada da api do repos', () => {
    const error = new Error('Error fetching repositories');
    mockGithubService.get.and.returnValue(throwError(error));

    component.searchRepository();

    expect(component.haveError).toBeTruthy();
  });


  it('deve setar starOrLanguage para true quando for selecionado "repos" na função changeTab', () => {
    const tab = 'repos';
    component.changeTab(tab);

    expect(component.starOrLanguage).toBe(true);
  });

  it('deve setar starOrLanguage para false quando for selecionado "starred" na função changeTab', () => {
    const tab = 'starred';

    component.changeTab(tab);
    expect(component.starOrLanguage).toBe(false);
  });


  it('Deve chamar a api searchStarred', () => {
    const starredData = [{ name: 'Starred1' }, { name: 'Starred2' }];
    mockGithubService.get.and.returnValue(of(starredData));

    component.searchStarred();

    expect(mockGithubService.get).toHaveBeenCalledWith(`users/${component.userGithubSearch}/starred`);
  });

  it('deve setar a variavel StarredArray com o resultado da função searchStarred', () => {
    const starredData = [{ name: 'Starred1' }, { name: 'Starred2' }];
    mockGithubService.get.and.returnValue(of(starredData));

    component.searchStarred();

    expect(component.StarredArray).toEqual(starredData);
  });


  it('deve setar haveError como true se ocorrer um erro na chamada da api do starred', () => {
    const error = new Error('Error fetching users');
    mockGithubService.get.and.returnValue(throwError(error));

    component.searchStarred();

    expect(component.haveError).toBeTruthy();
  });
});
