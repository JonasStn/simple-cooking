import { async, TestBed } from '@angular/core/testing';
import { CommonCustomMaterialModule } from './common-custom-material.module';

describe('CommonCustomMaterialModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonCustomMaterialModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CommonCustomMaterialModule).toBeDefined();
  });
});
