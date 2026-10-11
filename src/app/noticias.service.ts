import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Noticia, NuevaNoticia } from './models';

const CLAVE_FAVORITOS = 'noticias_favoritas';
const CLAVE_EXTRA = 'noticias_extra';

@Injectable({ providedIn: 'root' })
export class NoticiasService {
  // Los datos base vienen de JSON; los añadidos por el mini CRUD se guardan en el navegador.
  private readonly urlDatos = 'assets/noticias.json';

  constructor(private http: HttpClient) {}

  obtenerNoticias(): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(this.urlDatos).pipe(
      map((base) => [...base, ...this.leerExtras()])
    );
  }

  obtenerNoticia(id: number): Observable<Noticia | undefined> {
    return this.obtenerNoticias().pipe(map((lista) => lista.find((n) => n.id === id)));
  }

  obtenerIdsFavoritos(): number[] {
    try {
      const valor: unknown = JSON.parse(localStorage.getItem(CLAVE_FAVORITOS) ?? '[]');
      return Array.isArray(valor) ? valor.map(Number) : [];
    } catch {
      return [];
    }
  }

  esFavorita(id: number): boolean {
    return this.obtenerIdsFavoritos().includes(id);
  }

  alternarFavorito(id: number): boolean {
    const ids = this.obtenerIdsFavoritos();
    const nuevo = ids.includes(id) ? ids.filter((actual) => actual !== id) : [...ids, id];
    localStorage.setItem(CLAVE_FAVORITOS, JSON.stringify(nuevo));
    return nuevo.includes(id);
  }

  obtenerFavoritas(): Observable<Noticia[]> {
    const ids = this.obtenerIdsFavoritos();
    return this.obtenerNoticias().pipe(map((lista) => lista.filter((n) => ids.includes(n.id))));
  }

  crearNoticia(datos: NuevaNoticia): void {
    const extras = this.leerExtras();
    const fecha = new Intl.DateTimeFormat('es-CO', {
      day: 'numeric', month: 'long', year: 'numeric'
    }).format(new Date());
    const noticia: Noticia = {
      id: Date.now(), categoria: datos.categoria, titulo: datos.titulo.trim(), fecha,
      imagen: datos.imagen.trim() || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1000&q=80',
      descripcion: datos.descripcion.trim(), contenido: datos.descripcion.trim()
    };
    localStorage.setItem(CLAVE_EXTRA, JSON.stringify([...extras, noticia]));
  }

  eliminarNoticiaExtra(id: number): void {
    const extras = this.leerExtras().filter((n) => n.id !== id);
    localStorage.setItem(CLAVE_EXTRA, JSON.stringify(extras));
    // Si el registro borrado también era favorito, se quita de la lista personal.
    const favoritos = this.obtenerIdsFavoritos().filter((actual) => actual !== id);
    localStorage.setItem(CLAVE_FAVORITOS, JSON.stringify(favoritos));
  }

  esNoticiaCreadaLocalmente(id: number): boolean {
    return this.leerExtras().some((n) => n.id === id);
  }

  private leerExtras(): Noticia[] {
    try {
      const valor: unknown = JSON.parse(localStorage.getItem(CLAVE_EXTRA) ?? '[]');
      return Array.isArray(valor) ? valor as Noticia[] : [];
    } catch {
      return [];
    }
  }
}
