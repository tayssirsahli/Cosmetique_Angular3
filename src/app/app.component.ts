import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { NgIfContext } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'cosmetique';
loginLink: TemplateRef<NgIfContext<Boolean>> | null | undefined;
  constructor (public authService: AuthService,
                private router:Router) {}


  ngOnInit() {
    this.authService.loadToken();
    if (this.authService.getToken() == null || this.authService.isTokenExpired())
      this.router.navigate(['/login']);
  }
                
                  
  onLogout()
  {
    this.authService.logout();
  }
}
