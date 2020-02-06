import { async, TestBed } from '@angular/core/testing';
import { SharedDataAccessAuthModule } from './shared-data-access-auth.module';

describe('SharedDataAccessAuthModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedDataAccessAuthModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedDataAccessAuthModule).toBeDefined();
  });
});
