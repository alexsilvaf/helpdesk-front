import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @ViewChild('drawer') drawer: MatDrawer;
  scrWidth: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @HostListener('window:resize')
  getScreenSize() {
    if(this.scrWidth > window.innerWidth) this.drawer.toggle();
    this.scrWidth = window.innerWidth;
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private toast: ToastrService) {
    this.getScreenSize();
  }

  ngOnInit(): void {
    this.router.navigate(['home'])
  }

  logout() {
    this.router.navigate(['login'])
    this.authService.logout();
    this.toast.clear();
    this.toast.info('Logout realizado com sucesso', 'Sistema');
  }
}
