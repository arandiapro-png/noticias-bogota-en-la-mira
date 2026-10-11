import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Noticia } from './models';

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <article class="card">
      <img [src]="noticia.imagen" [alt]="noticia.titulo" loading="lazy">
      <div class="card-body">
        <span class="tag">{{ noticia.categoria }}</span>
        <div class="date">{{ noticia.fecha }}</div>
        <h3>{{ noticia.titulo }}</h3>
        <p>{{ noticia.descripcion }}</p>
        <div class="actions">
          <a class="btn secondary" [routerLink]="['/detalle', noticia.id]">Ver más</a>
          <button type="button" class="btn" (click)="favoriteClick.emit(noticia.id)">
            {{ favorita ? '★ Favorito' : '☆ Favoritos' }}
          </button>
        </div>
      </div>
    </article>
  `
})
export class NewsCardComponent {
  @Input({ required: true }) noticia!: Noticia;
  @Input() favorita = false;
  @Output() favoriteClick = new EventEmitter<number>();
}
