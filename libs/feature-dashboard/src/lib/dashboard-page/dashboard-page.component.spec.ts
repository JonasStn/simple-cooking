import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { createSpyObject, SpyObject } from '@ngneat/spectator/jest';
import { AuthFacade } from '@simple-cooking/shared/data-access-auth';

import { DashboardPageComponent } from './dashboard-page.component';

describe('DashboardPageComponent', () => {
  let component: DashboardPageComponent;
  let fixture: ComponentFixture<DashboardPageComponent>;
  let authFacade: SpyObject<AuthFacade>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardPageComponent],
      providers: [
        { provide: AuthFacade, useValue: createSpyObject(AuthFacade) }
      ]
    }).compileComponents();
    authFacade = TestBed.inject(AuthFacade) as SpyObject<AuthFacade>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
