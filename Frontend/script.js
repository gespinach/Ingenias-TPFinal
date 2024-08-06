// script.js
document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/trailerflix/')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (!Array.isArray(data)) {
          throw new Error('Data is not an array');
        }
        renderItems(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  });
  
  function renderItems(items) {
    const container = document.getElementById('items-container');
    
    if (!container) {
      console.error('Element with ID "items-container" not found in the DOM.');
      return;
    }
  
    container.innerHTML = ''; // Clear any previous content
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
  