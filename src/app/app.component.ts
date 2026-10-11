import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <header class="site-header">
      <div class="container nav">
        <a class="brand" routerLink="/" aria-label="Ir al inicio">Noticias <span>Bogotá en la Mira</span></a>
        <nav aria-label="Navegación principal">
          <a routerLink="/" [routerLinkActiveOptions]="{exact:true}" routerLinkActive="active">Inicio</a>
          <a routerLink="/noticias" routerLinkActive="active">Noticias</a>
          <a routerLink="/favoritos" routerLinkActive="active">Favoritos</a>
          <a routerLink="/contacto" routerLinkActive="active">Contacto</a>
          <a routerLink="/administrar" routerLinkActive="active">Administrar</a>
        </nav>
        <form class="search" (ngSubmit)="buscar()" role="search">
          <input name="q" [(ngModel)]="textoBusqueda" placeholder="Buscar noticias..." aria-label="Buscar noticias">
          <button type="submit" aria-label="Buscar">⌕</button>
        </form>
      </div>
    </header>
    <router-outlet></router-outlet>
    <footer>
      <div class="container footer">
        <div><strong>Noticias Bogotá en la Mira</strong><div class="small">Proyecto académico de Desarrollo de Front-end.</div></div>
        <div class="small">Información organizada para una navegación sencilla.</div>
      </div>
    </footer>
  `
})
export class AppComponent {
  textoBusqueda = '';
  constructor(private router: Router) {}

  buscar(): void {
    this.router.navigate(['/noticias'], {
      queryParams: this.textoBusqueda.trim() ? { q: this.textoBusqueda.trim() } : {}
    });
  }
}
