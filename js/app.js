
const DATA_URL = 'data/noticias.json';

function getFavorites(){
  return JSON.parse(localStorage.getItem('noticias_favoritas') || '[]');
}
function setFavorites(ids){
  localStorage.setItem('noticias_favoritas', JSON.stringify(ids));
}
function isFavorite(id){ return getFavorites().includes(Number(id)); }
function toggleFavorite(id){
  id=Number(id); let fav=getFavorites();
  fav=fav.includes(id)?fav.filter(x=>x!==id):[...fav,id];
  setFavorites(fav); showToast(fav.includes(id)?'Noticia agregada a favoritos':'Noticia eliminada de favoritos');
  return fav.includes(id);
}
function showToast(msg){
  const t=document.getElementById('toast'); if(!t)return;
  t.textContent=msg;t.style.display='block';setTimeout(()=>t.style.display='none',1800);
}
function setupSearch(){
  const form=document.getElementById('searchForm'); if(!form)return;
  form.addEventListener('submit',e=>{e.preventDefault();const q=document.getElementById('searchInput').value.trim(); if(q) location.href=`noticias.html?q=${encodeURIComponent(q)}`;});
}
function card(n){
 return `<article class="card">
   <img src="${n.imagen}" alt="${n.titulo}">
   <div class="card-body">
    <span class="tag">${n.categoria}</span><div class="date">${n.fecha}</div>
    <h3>${n.titulo}</h3><p>${n.descripcion}</p>
    <div class="actions"><a class="btn secondary" href="detalle.html?id=${n.id}">Ver más</a>
    <button class="btn" onclick="toggleFavorite(${n.id});this.textContent=isFavorite(${n.id})?'★ Favorito':'☆ Favoritos'">${isFavorite(n.id)?'★ Favorito':'☆ Favoritos'}</button></div>
   </div></article>`;
}
async function loadNews(){
 const r=await fetch(DATA_URL); return await r.json();
}
async function renderHome(){
 const data=await loadNews();
 document.getElementById('featured').innerHTML=data.slice(0,3).map(card).join('');
 const hero=data[0]; const h=document.getElementById('hero');
 h.style.backgroundImage=`url("${hero.imagen}")`;
 h.innerHTML=`<div class="hero-content"><span class="tag">${hero.categoria}</span><h1>${hero.titulo}</h1><p>${hero.descripcion}</p><a class="btn" href="detalle.html?id=${hero.id}">Ver noticia</a></div>`;
}
async function renderNews(){
 const data=await loadNews(); const params=new URLSearchParams(location.search);
 let q=(params.get('q')||'').toLowerCase(); let cat='Todos';
 const grid=document.getElementById('newsGrid'); const filters=document.getElementById('filters');
 const cats=['Todos',...new Set(data.map(n=>n.categoria))];
 filters.innerHTML=cats.map(c=>`<button class="filter ${c==='Todos'?'active':''}" data-cat="${c}">${c}</button>`).join('');
 function paint(){
   const active=filters.querySelector('.filter.active')?.dataset.cat||'Todos';
   let list=data.filter(n=>(active==='Todos'||n.categoria===active)&&(!q||(n.titulo+' '+n.descripcion).toLowerCase().includes(q)));
   grid.innerHTML=list.length?list.map(card).join(''):`<div class="empty"><h3>No encontramos noticias</h3><p>Prueba otra categoría o término de búsqueda.</p></div>`;
 }
 filters.addEventListener('click',e=>{if(!e.target.matches('.filter'))return;filters.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));e.target.classList.add('active');paint();});
 paint();
}
async function renderDetail(){
 const data=await loadNews(); const id=Number(new URLSearchParams(location.search).get('id'))||1;
 const n=data.find(x=>x.id===id)||data[0]; document.title=n.titulo+' | Noticias Bogotá en la Mira';
 document.getElementById('detail').innerHTML=`<div class="article"><span class="tag">${n.categoria}</span><div class="date">${n.fecha}</div>
 <h1>${n.titulo}</h1><img src="${n.imagen}" alt="${n.titulo}"><div class="article-text">${n.contenido.split('\\n\\n').map(p=>`<p>${p}</p>`).join('')}</div>
 <button class="btn" id="favBtn">${isFavorite(n.id)?'★ Quitar de favoritos':'♡ Agregar a favoritos'}</button></div>
 <aside class="sidebar"><h3>Noticias relacionadas</h3>${data.filter(x=>x.id!==n.id).slice(0,3).map(x=>`<a class="related" href="detalle.html?id=${x.id}"><img src="${x.imagen}" alt=""><div><h4>${x.titulo}</h4><span class="date">${x.fecha}</span></div></a>`).join('')}</aside>`;
 document.getElementById('favBtn').onclick=()=>{toggleFavorite(n.id);document.getElementById('favBtn').textContent=isFavorite(n.id)?'★ Quitar de favoritos':'♡ Agregar a favoritos';};
}
async function renderFavorites(){
 const data=await loadNews();const fav=getFavorites();const list=data.filter(n=>fav.includes(n.id));const el=document.getElementById('favorites');
 el.innerHTML=list.length?list.map(card).join(''):`<div class="empty"><h3>Aún no tienes favoritos</h3><p>Agrega noticias desde el listado o desde su detalle.</p><a class="btn" href="noticias.html">Explorar noticias</a></div>`;
}
function setupContact(){
 const form=document.getElementById('contactForm'); if(!form)return;
 form.addEventListener('submit',e=>{
   e.preventDefault();let ok=true;
   const name=document.getElementById('name'), email=document.getElementById('email'), subject=document.getElementById('subject'), msg=document.getElementById('message');
   document.querySelectorAll('.error').forEach(x=>x.textContent='');
   if(name.value.trim().length<3){document.getElementById('nameError').textContent='Ingresa tu nombre.';ok=false}
   if(!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email.value)){document.getElementById('emailError').textContent='Ingresa un correo válido.';ok=false}
   if(!subject.value){document.getElementById('subjectError').textContent='Selecciona un asunto.';ok=false}
   if(msg.value.trim().length<10){document.getElementById('messageError').textContent='El mensaje debe tener mínimo 10 caracteres.';ok=false}
   if(ok){document.getElementById('success').textContent='Mensaje enviado correctamente. Gracias por contactarnos.';document.getElementById('success').style.display='block';form.reset();}
 });
}

async function setupAdmin(){
  const data = await loadNews();
  const key = 'noticias_extra';

  let extra = JSON.parse(localStorage.getItem(key) || '[]');
  let all = [...data, ...extra];

  const form = document.getElementById('newsForm');
  const list = document.getElementById('adminList');

  function paint(){
    all = [...data, ...extra];

    list.innerHTML = all.map(function(n){
      let boton = '';

      if(n.id > 100000){
        boton = '<button class="btn danger" data-id="' + n.id + '">Eliminar</button>';
      }

      return '<div class="admin-row">' +
        '<div>' +
        '<b>' + n.titulo + '</b>' +
        '<div class="date">' + n.categoria + ' · ' + n.fecha + '</div>' +
        '</div>' +
        boton +
        '</div>';
    }).join('');
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();

    const nuevo = {
      id: Date.now(),
      categoria: document.getElementById('cat').value,
      titulo: document.getElementById('title').value,
      fecha: new Date().toLocaleDateString('es-CO', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      imagen: document.getElementById('image').value || data[0].imagen,
      descripcion: document.getElementById('description').value,
      contenido: document.getElementById('description').value
    };

    extra.push(nuevo);
    localStorage.setItem(key, JSON.stringify(extra));

    form.reset();
    paint();
    showToast('Noticia creada correctamente');
  });

  list.addEventListener('click', function(e){
    if(!e.target.dataset.id) return;

    const id = Number(e.target.dataset.id);

    extra = extra.filter(function(n){
      return n.id !== id;
    });

    localStorage.setItem(key, JSON.stringify(extra));
    paint();
  });

  paint();
}
document.addEventListener('DOMContentLoaded',()=>{setupSearch();});
