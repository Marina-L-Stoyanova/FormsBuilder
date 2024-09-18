import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NorthwindABService } from './northwind-ab.service';

describe('NorthwindABService', () => {
  let service: NorthwindABService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(NorthwindABService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
