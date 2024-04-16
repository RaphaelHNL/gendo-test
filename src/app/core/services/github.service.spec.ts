import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GithubService } from './github.service';

fdescribe('GithubService', () => {
  let service: GithubService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubService]
    });

    service = TestBed.inject(GithubService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve fazer o get sem o token', inject([HttpTestingController],
    (httpClient: HttpTestingController) => {
      const testData = { data: 'test' };

      service.get('test').subscribe(data => {
        expect(data).toEqual(testData);
      });

      const req = httpMock.expectOne('https://api.github.com/test');
      expect(req.request.method).toEqual('GET');

      req.flush(testData);
    }));

  it('deve fazer o get com o token', inject([HttpTestingController],
    (httpClient: HttpTestingController) => {
      const testData = { data: 'test' };
      sessionStorage.setItem('token', 'test_token');

      service.get('test').subscribe(data => {
        expect(data).toEqual(testData);
      });

      const req = httpMock.expectOne('https://api.github.com/test');
      expect(req.request.method).toEqual('GET');


      req.flush(testData);
    }));

  it('Deve lançar um erro', inject([HttpTestingController],
    (httpClient: HttpTestingController) => {
      service.get('test').subscribe(
        () => fail('should have failed with the 404 error'),
        (error: any) => {
          expect(error.status).toBe(404);
        }
      );

      const req = httpMock.expectOne('https://api.github.com/test');
      req.flush('Error occurred', { status: 404, statusText: 'Not Found' });
    }));
});
