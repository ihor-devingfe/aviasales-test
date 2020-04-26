import {TestBed} from '@angular/core/testing';

import {LoaderService} from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not show loader initially', () => {
    service.isLoading$.subscribe(loading => expect(loading).toBeFalse());
  });

  describe('showLoader()', () => {
    it('should publish "true" to show loader', () => {
      service.showLoader();
      service.isLoading$.subscribe(loading => expect(loading).toBeTrue());
    });
  });


  describe('hideLoader()', () => {
    it('should publish "false" to hide loader', () => {
      service.hideLoader();
      service.isLoading$.subscribe(loading => expect(loading).toBeFalse());
    });
  });
});
