import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Noticia } from '../models';
import { NoticiasService } from '../noticias.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <main class="main-content container">
      <a class="text-link back-link" routerLink="/noticias">← Volver a noticias</a>
      <div class="detail-layout" *ngIf="noticia; else noEncontrada">
        <article class="article">
          <span class="tag">{{ noticia.categoria }}</span><div class="date">{{ noticia.fecha }}</div>
          <h1>{{ noticia.titulo }}</h1>
          <img class="article-image" [src]="noticia.imagen" [alt]="noticia.titulo">
          <div class="article-text"><p *ngFor="let parrafo of parrafos">{{ parrafo }}</p></div>
          <button class="btn" type="button" (click)="alternarFavorito()">{{ favorita ? '★ Quitar de favoritos' : '♡ Agregar a favoritos' }}</button>
          <p class="success-message" *ngIf="aviso">{{ aviso }}</p>
        </article>
        <aside class="sidebar"><h2>Noticias relacionadas</h2>
          <a class="related" *ngFor="let relacionada of relacionadas" [routerLink]="['/detalle', relacionada.id]">
            <img [src]="relacionada.imagen" [alt]="relacionada.titulo"><div><h3>{{ relacionada.titulo }}</h3><span class="date">{{ relacionada.fecha }}</span></div>
          </a>
        </aside>
      </div>
      <ng-template #noEncontrada><div class="empty"><h2>Noticia no encontrada</h2><p>Regresa al listado para elegir otra noticia.</p><a class="btn" routerLink="/noticias">Ver noticias</a></div></ng-template>
    </main>
  `
})
export class DetalleComponent implements OnInit {
  noticia?: Noticia;
  lista: Noticia[] = [];
  favorita = false;
  aviso = '';
  constructor(private servicio: NoticiasService, private ruta: ActivatedRoute) {}

  ngOnInit(): void {
    this.ruta.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.servicio.obtenerNoticias().subscribe((lista) => {
        this.lista = lista; this.noticia = lista.find((n) => n.id === id); this.favorita = this.noticia ? this.servicio.esFavorita(this.noticia.id) : false;
      });
    });
  }
  get parrafos(): string[] { return this.noticia?.contenido.split('\n\n') ?? []; }
  get relacionadas(): Noticia[] { return this.lista.filter((n) => n.id !== this.noticia?.id).slice(0, 3); }
  alternarFavorito(): void {
    if (!this.noticia) return;
    this.favorita = this.servicio.alternarFavorito(this.noticia.id);
    this.aviso = this.favorita ? 'La noticia se agregó a favoritos.' : 'La noticia se quitó de favoritos.';
  }
}
