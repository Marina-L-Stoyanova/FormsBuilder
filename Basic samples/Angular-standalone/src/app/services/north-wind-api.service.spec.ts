import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NorthWindAPIService } from './north-wind-api.service';

describe('NorthWindAPIService', () => {
  let service: NorthWindAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(NorthWindAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
