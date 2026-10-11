import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { NoticiasComponent } from './pages/noticias.component';
import { DetalleComponent } from './pages/detalle.component';
import { FavoritosComponent } from './pages/favoritos.component';
import { ContactoComponent } from './pages/contacto.component';
import { AdministrarComponent } from './pages/administrar.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Inicio | Noticias Bogotá en la Mira' },
  { path: 'noticias', component: NoticiasComponent, title: 'Noticias | Noticias Bogotá en la Mira' },
  { path: 'detalle/:id', component: DetalleComponent, title: 'Detalle de noticia | Noticias Bogotá en la Mira' },
  { path: 'favoritos', component: FavoritosComponent, title: 'Favoritos | Noticias Bogotá en la Mira' },
  { path: 'contacto', component: ContactoComponent, title: 'Contacto | Noticias Bogotá en la Mira' },
  { path: 'administrar', component: AdministrarComponent, title: 'Administrar noticias | Noticias Bogotá en la Mira' },
  { path: '**', redirectTo: '' }
];
