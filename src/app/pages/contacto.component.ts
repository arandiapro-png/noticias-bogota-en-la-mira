import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <main class="main-content container">
      <h1 class="page-title">Contáctanos</h1>
      <p class="muted">¿Tienes alguna duda, sugerencia o quieres compartir una noticia? Escríbenos.</p>
      <div class="form-layout">
        <form class="form-box" #formulario="ngForm" (ngSubmit)="enviar(formulario)" novalidate>
          <div *ngIf="enviado" class="success-message" role="status">Tu mensaje fue validado correctamente. Esta demostración no envía datos a un servidor.</div>
          <div class="field"><label for="nombre">Nombre completo *</label><input id="nombre" name="nombre" [(ngModel)]="datos.nombre" required minlength="3" #nombre="ngModel" placeholder="Tu nombre"><small class="error" *ngIf="nombre.invalid && (nombre.touched || formulario.submitted)">Escribe al menos 3 caracteres.</small></div>
          <div class="field"><label for="correo">Correo electrónico *</label><input id="correo" name="correo" type="email" [(ngModel)]="datos.correo" required email #correo="ngModel" placeholder="ejemplo@correo.com"><small class="error" *ngIf="correo.invalid && (correo.touched || formulario.submitted)">Ingresa un correo válido.</small></div>
          <div class="field"><label for="asunto">Asunto *</label><select id="asunto" name="asunto" [(ngModel)]="datos.asunto" required #asunto="ngModel"><option value="">Selecciona un asunto</option><option>Sugerencia</option><option>Corrección de noticia</option><option>Compartir información</option><option>Otro</option></select><small class="error" *ngIf="asunto.invalid && (asunto.touched || formulario.submitted)">Selecciona un asunto.</small></div>
          <div class="field"><label for="mensaje">Mensaje *</label><textarea id="mensaje" name="mensaje" [(ngModel)]="datos.mensaje" required minlength="10" rows="5" #mensaje="ngModel" placeholder="Escribe tu mensaje..."></textarea><small class="error" *ngIf="mensaje.invalid && (mensaje.touched || formulario.submitted)">El mensaje debe tener al menos 10 caracteres.</small></div>
          <button class="btn" type="submit">Enviar mensaje</button>
        </form>
        <aside class="info-box"><span class="eyebrow">Información de contacto</span><h2>También puedes escribirnos</h2><p><strong>Correo:</strong> contacto@bogotaenlamira.com</p><p><strong>Ubicación:</strong> Bogotá, Colombia</p><p><strong>Horario:</strong> Lunes a viernes, 8:00 a. m. - 6:00 p. m.</p><p class="muted disclaimer">Datos de ejemplo utilizados para este proyecto académico.</p></aside>
      </div>
    </main>
  `
})
export class ContactoComponent {
  datos = { nombre: '', correo: '', asunto: '', mensaje: '' };
  enviado = false;
  enviar(formulario: NgForm): void {
    this.enviado = false;
    if (formulario.invalid) { formulario.form.markAllAsTouched(); return; }
    this.enviado = true;
    formulario.resetForm();
  }
}
