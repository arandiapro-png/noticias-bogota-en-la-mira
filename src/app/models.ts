export interface Noticia {
  id: number;
  categoria: string;
  titulo: string;
  fecha: string;
  imagen: string;
  descripcion: string;
  contenido: string;
}

export interface NuevaNoticia {
  categoria: string;
  titulo: string;
  imagen: string;
  descripcion: string;
}
