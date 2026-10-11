import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Noticia } from '../models';
import { NoticiasService } from '../noticias.service';
import { NewsCardComponent } from '../news-card.component';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, NewsCardComponent],
  template: `
    <main class="main-content container">
      <section *ngIf="portada" class="hero" [style.background-image]="fondoPortada">
        <div class="hero-content">
          <span class="tag">{{ portada.categoria }}</span>
          <h1>{{ portada.titulo }}</h1>
          <p>{{ portada.descripcion }}</p>
          <a class="btn" [routerLink]="['/detalle', portada.id]">Ver noticia</a>
        </div>
      </section>
      <div class="section-head"><h2>Noticias destacadas</h2><a routerLink="/noticias" class="text-link">Ver todas →</a></div>
      <p *ngIf="cargando" class="muted">Cargando noticias...</p>
      <p *ngIf="error" class="error-box">No se pudieron cargar las noticias. Revisa el archivo de datos e inténtalo de nuevo.</p>
      <section class="grid" *ngIf="!cargando && destacadas.length">
        <app-news-card *ngFor="let noticia of destacadas" [noticia]="noticia"
          [favorita]="esFavorita(noticia.id)" (favoriteClick)="alternarFavorito($event)"></app-news-card>
      </section>
      <section class="info-strip">
        <div><span class="eyebrow">Información a tu alcance</span><h2>Noticias organizadas para encontrar lo que buscas</h2>
          <p>Explora las categorías, consulta cada historia y guarda tus noticias favoritas para revisarlas después.</p></div>
        <a class="btn" routerLink="/noticias">Explorar noticias</a>
      </section>
    </main>
  `
})
export class HomeComponent implements OnInit {
  noticias: Noticia[] = [];
  cargando = true;
  error = false;
  constructor(private servicio: NoticiasService) {}

  ngOnInit(): void {
    this.servicio.obtenerNoticias().subscribe({
      next: (lista) => { this.noticias = lista; this.cargando = false; },
      error: () => { this.error = true; this.cargando = false; }
    });
  }
  get portada(): Noticia | undefined { return this.noticias[0]; }
  get destacadas(): Noticia[] { return this.noticias.slice(0, 3); }
  get fondoPortada(): string { return this.portada ? `linear-gradient(90deg, #081d30a8, #081d30e6), url("${this.portada.imagen}")` : ''; }
  esFavorita(id: number): boolean { return this.servicio.esFavorita(id); }
  alternarFavorito(id: number): void { this.servicio.alternarFavorito(id); }
}
