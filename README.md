# Noticias Bogotá en la Mira

Aplicación académica de noticias desarrollada para el módulo Desarrollo de Front-end del Politécnico Grancolombiano.

## Enlace publicado

https://arandiapro-png.github.io/noticias-bogota-en-la-mira/

## Funciones

- Inicio con noticia destacada.
- Listado de noticias desde un archivo JSON y filtros por categoría.
- Búsqueda por título, descripción y categoría.
- Vista de detalle de cada noticia.
- Favoritos guardados con `localStorage`.
- Formulario de contacto con validaciones.
- Administración básica para crear y eliminar noticias de prueba.
- Diseño adaptable a pantallas pequeñas y grandes.

## Tecnologías

Angular, TypeScript, HTML, CSS, JSON, Angular Router y `localStorage`.

## Ejecutar localmente

1. Instalar Node.js (versión LTS).
2. Abrir esta carpeta en Visual Studio Code.
3. En la terminal ejecutar:

   ```bash
   npm install
   npm start
   ```

4. Abrir http://localhost:4200/

## Estructura principal

- `src/app/`: componentes, rutas y servicio de noticias.
- `src/app/pages/`: pantallas del sitio.
- `public/assets/noticias.json`: datos iniciales.
- `src/styles.css`: estilos compartidos.
- `.github/workflows/deploy.yml`: compilación y publicación automática con GitHub Pages.

## Consideraciones

Los registros de noticias de prueba y favoritos se guardan en el navegador actual. El formulario valida los datos y muestra una confirmación, pero no envía correos ni guarda mensajes en un servidor. El proyecto no incluye backend ni inicio de sesión.
