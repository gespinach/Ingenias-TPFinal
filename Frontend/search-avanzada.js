// search-category.js

document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const id = document.getElementById('id').value || "";
    const titulo = document.getElementById('titulo').value || "";
    const categoria = document.getElementById('categoria').value || "";
    const genero = document.getElementById('genero').value || "";
    const resumen = document.getElementById('resumen').value || "";
    const temporadas = document.getElementById('temporadas').value|| "";
    const tag = document.getElementById('tag').value || "";
    const actor = document.getElementById('actor').value || "";

    fetch(`http://localhost:3000/trailerflix/buscar?id=${id}&titulo=${titulo}&categoria=${categoria}&genero=${genero}&resumen=${resumen}&temporadas=${temporadas}&tag=${tag}&actor=${actor}`)
      .then(response => response.json())
      .then(data => renderItems(data))
      .catch(error => console.error('Error fetching data:', error));
  });
  
  function renderItems(items) {
    const container = document.getElementById('items-container');
    container.innerHTML = '';
  
    if (items.length === 0) {
      container.innerHTML = '<p>No se encontraron items para esta búsqueda.</p>';
      return;
    }
  
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'item-card';
    
      //   const poster = document.createElement('img');
      //   poster.src = item.poster;
      //   poster.alt = item.titulo;
      //   card.appendChild(poster);
    
        const title = document.createElement('h2');
        title.textContent = item.titulo;
        card.appendChild(title);
    
        const summary = document.createElement('p');
        summary.textContent = item.resumen;
        card.appendChild(summary);
    
        const category = document.createElement('p');
        category.innerHTML = `<strong>Categoría:</strong> ${item.categoria}`;
        card.appendChild(category);
    
        const genre = document.createElement('p');
        genre.innerHTML = `<strong>Género:</strong> ${item.genero}`;
        card.appendChild(genre);
    
        const tags = document.createElement('p');
        tags.innerHTML = `<strong>Tags:</strong> ${item.tags.join(', ')}`;
        card.appendChild(tags);
    
        const actors = document.createElement('p');
        actors.innerHTML = `<strong>Actores:</strong> ${item.actores.join(', ')}`;
        card.appendChild(actors);
    
        const trailerLink = document.createElement('a');
        trailerLink.href = item.trailer;
        trailerLink.textContent = 'Ver trailer';
        trailerLink.target = '_blank';
        card.appendChild(trailerLink);
    
        container.appendChild(card);
    });
  }
  