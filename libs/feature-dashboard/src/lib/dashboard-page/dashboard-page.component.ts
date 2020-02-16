import { Component, OnInit } from '@angular/core';
import { UserInfoDTO } from '@simple-cooking/api-interfaces';
import { AuthFacade } from '@simple-cooking/shared/data-access-auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'simple-cooking-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  userLoading$: Observable<boolean>;
  user$: Observable<UserInfoDTO>;

  constructor(private authFacade: AuthFacade) {}

  ngOnInit() {
    this.userLoading$ = this.authFacade.userLoading$;
    this.user$ = this.authFacade.user$;
  }
}
