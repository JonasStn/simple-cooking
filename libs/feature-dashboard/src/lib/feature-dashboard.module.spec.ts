import { async, TestBed } from '@angular/core/testing';
import { FeatureDashboardModule } from './feature-dashboard.module';

describe('FeatureDashboardModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeatureDashboardModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeatureDashboardModule).toBeDefined();
  });
});
