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
      <h1 class="page-title">Mis favoritos</h1>
      <p class="muted">Aquí aparecen las noticias que guardaste en este navegador.</p>
      <section class="grid" *ngIf="favoritas.length">
        <app-news-card *ngFor="let noticia of favoritas" [noticia]="noticia" [favorita]="true" (favoriteClick)="quitarFavorito($event)"></app-news-card>
      </section>
      <div class="empty" *ngIf="!favoritas.length"><h2>Aún no tienes favoritos</h2><p>Agrega noticias desde el listado o desde su detalle.</p><a class="btn" routerLink="/noticias">Explorar noticias</a></div>
    </main>
  `
})
export class FavoritosComponent implements OnInit {
  favoritas: Noticia[] = [];
  constructor(private servicio: NoticiasService) {}
  ngOnInit(): void { this.cargar(); }
  cargar(): void { this.servicio.obtenerFavoritas().subscribe((lista) => this.favoritas = lista); }
  quitarFavorito(id: number): void { this.servicio.alternarFavorito(id); this.cargar(); }
}
