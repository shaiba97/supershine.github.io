import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { VisitorService } from './visitor.service';

describe('VisitorService', () => {
  let service: VisitorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [VisitorService]
    });
  });


  service = TestBed.inject(VisitorService);
  TestBed.get(HttpTestingController)
  TestBed.inject(HttpClient)

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
