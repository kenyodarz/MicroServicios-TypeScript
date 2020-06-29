// Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// PrimeNG
import { ConfirmationService } from 'primeng/api';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {
  appName = 'CURSOS';
  items: MenuItem[]

  constructor(private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.items = [
      { label: 'Angular.io', icon: 'pi pi-external-link', url: 'http://angular.io' },
      { label: 'Theming', icon: 'pi pi-palette', routerLink: ['/theming'] }
    ];
  }

}
