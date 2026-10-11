import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Noticia } from '../models';
import { NoticiasService } from '../noticias.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <main class="main-content container">
      <h1 class="page-title">Administrar noticias</h1>
      <p class="muted">Crea o elimina noticias de prueba. Los cambios quedan guardados en este navegador.</p>
      <section class="admin-layout">
        <form class="form-box" #formulario="ngForm" (ngSubmit)="crear(formulario)" novalidate>
          <h2>Agregar noticia</h2>
          <div class="field"><label for="titulo">Título *</label><input id="titulo" name="titulo" [(ngModel)]="datos.titulo" required minlength="5" #titulo="ngModel"><small class="error" *ngIf="titulo.invalid && (titulo.touched || formulario.submitted)">Escribe un título de mínimo 5 caracteres.</small></div>
          <div class="field"><label for="categoria">Categoría *</label><select id="categoria" name="categoria" [(ngModel)]="datos.categoria" required #categoria="ngModel"><option value="">Selecciona una categoría</option><option *ngFor="let cat of categorias" [value]="cat">{{cat}}</option></select><small class="error" *ngIf="categoria.invalid && (categoria.touched || formulario.submitted)">Selecciona una categoría.</small></div>
          <div class="field"><label for="descripcion">Descripción *</label><textarea id="descripcion" name="descripcion" [(ngModel)]="datos.descripcion" required minlength="10" rows="3" #descripcion="ngModel"></textarea><small class="error" *ngIf="descripcion.invalid && (descripcion.touched || formulario.submitted)">Escribe al menos 10 caracteres.</small></div>
          <div class="field"><label for="imagen">URL de imagen (opcional)</label><input id="imagen" name="imagen" [(ngModel)]="datos.imagen" type="url" placeholder="https://..."></div>
          <button class="btn" type="submit">Guardar noticia</button>
          <p class="success-message" *ngIf="aviso">{{ aviso }}</p>
        </form>
        <section class="admin-list"><h2>Noticias del catálogo ({{noticias.length}})</h2>
          <div class="admin-row" *ngFor="let noticia of noticias"><div><strong>{{ noticia.titulo }}</strong><div class="date">{{ noticia.categoria }} · {{ noticia.fecha }}</div></div><button *ngIf="esExtra(noticia.id)" class="btn danger" type="button" (click)="eliminar(noticia.id)">Eliminar</button><span *ngIf="!esExtra(noticia.id)" class="source-label">Base JSON</span></div>
          <p class="muted note">Las noticias originales se conservan en JSON. Desde aquí solo se eliminan registros creados localmente.</p>
        </section>
      </section>
    </main>
  `
})
export class AdministrarComponent implements OnInit {
  categorias = ['Colombia', 'Mundo', 'Deportes', 'Tecnología', 'Medio Ambiente', 'Cultura'];
  datos = { titulo: '', categoria: '', descripcion: '', imagen: '' };
  noticias: Noticia[] = [];
  aviso = '';
  constructor(private servicio: NoticiasService) {}
  ngOnInit(): void { this.cargar(); }
  cargar(): void { this.servicio.obtenerNoticias().subscribe((lista) => this.noticias = lista); }
  esExtra(id: number): boolean { return this.servicio.esNoticiaCreadaLocalmente(id); }
  crear(formulario: NgForm): void {
    this.aviso = '';
    if (formulario.invalid) { formulario.form.markAllAsTouched(); return; }
    this.servicio.crearNoticia(this.datos);
    this.datos = { titulo: '', categoria: '', descripcion: '', imagen: '' };
    formulario.resetForm(this.datos);
    this.cargar();
    this.aviso = 'Noticia guardada en este navegador.';
  }
  eliminar(id: number): void { this.servicio.eliminarNoticiaExtra(id); this.cargar(); this.aviso = 'Noticia eliminada.'; }
}
