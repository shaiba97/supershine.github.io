import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.scss']
})
export class MenuNavComponent {

  constructor(private cookieService: CookieService, private router: Router){}

  logOut(){
    this.cookieService.delete('admin')
    if (!this.cookieService.get("admin")) {
      this.router.navigateByUrl("/admin/clean-admin-login")
    }
  }

}
