import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Noticia } from '../models';
import { NoticiasService } from '../noticias.service';
import { NewsCardComponent } from '../news-card.component';

@Component({
  standalone: true,
  imports: [CommonModule, NewsCardComponent],
  template: `
    <main class="main-content container">
      <h1 class="page-title">Todas las noticias</h1>
      <p class="muted">Explora las últimas noticias de Colombia y el mundo.</p>
      <div class="filters" aria-label="Filtrar por categoría">
        <button *ngFor="let cat of categorias" type="button" class="filter" [class.active]="categoriaActual === cat" (click)="cambiarCategoria(cat)">{{ cat }}</button>
      </div>
      <p *ngIf="busqueda" class="muted">Resultados para: <strong>{{ busqueda }}</strong> <button class="link-button" (click)="limpiarBusqueda()">Limpiar</button></p>
      <p *ngIf="cargando" class="muted">Cargando noticias...</p>
      <section class="grid" *ngIf="!cargando && filtradas.length">
        <app-news-card *ngFor="let noticia of filtradas" [noticia]="noticia" [favorita]="esFavorita(noticia.id)" (favoriteClick)="alternarFavorito($event)"></app-news-card>
      </section>
      <div class="empty" *ngIf="!cargando && !filtradas.length"><h3>No encontramos noticias</h3><p>Prueba otra categoría o cambia el término de búsqueda.</p></div>
    </main>
  `
})
export class NoticiasComponent implements OnInit {
  noticias: Noticia[] = [];
  categorias: string[] = ['Todos'];
  categoriaActual = 'Todos';
  busqueda = '';
  cargando = true;
  constructor(private servicio: NoticiasService, private ruta: ActivatedRoute) {}

  ngOnInit(): void {
    this.ruta.queryParamMap.subscribe((params) => { this.busqueda = (params.get('q') ?? '').trim().toLowerCase(); });
    this.servicio.obtenerNoticias().subscribe({
      next: (lista) => { this.noticias = lista; this.categorias = ['Todos', ...new Set(lista.map((n) => n.categoria))]; this.cargando = false; },
      error: () => { this.cargando = false; }
    });
  }
  get filtradas(): Noticia[] {
    return this.noticias.filter((n) => (this.categoriaActual === 'Todos' || n.categoria === this.categoriaActual) &&
      (!this.busqueda || `${n.titulo} ${n.descripcion} ${n.categoria}`.toLowerCase().includes(this.busqueda)));
  }
  cambiarCategoria(cat: string): void { this.categoriaActual = cat; }
  limpiarBusqueda(): void { this.busqueda = ''; }
  esFavorita(id: number): boolean { return this.servicio.esFavorita(id); }
  alternarFavorito(id: number): void { this.servicio.alternarFavorito(id); }
}
